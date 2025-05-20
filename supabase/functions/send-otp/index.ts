
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import * as crypto from "https://deno.land/std@0.167.0/crypto/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    const { phone, userType } = await req.json();
    
    // Validate phone number
    if (!phone || typeof phone !== "string" || !phone.match(/^\+[0-9]{10,15}$/)) {
      return new Response(
        JSON.stringify({ error: "Invalid phone number format. Use international format (e.g., +1234567890)" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }
    
    // Validate user type
    if (!userType || (userType !== "customer" && userType !== "salon")) {
      return new Response(
        JSON.stringify({ error: "Invalid user type. Must be 'customer' or 'salon'" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Initialize Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );
    
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set OTP expiration (10 minutes from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    
    // Check if a user with this phone number already exists
    const { data: existingUser, error: lookupError } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("phone", phone)
      .maybeSingle();
    
    if (lookupError) {
      throw lookupError;
    }
    
    // If user exists, update their OTP in the auth.users metadata
    if (existingUser) {
      await supabaseAdmin.auth.admin.updateUserById(existingUser.id, {
        user_metadata: { 
          otp: {
            code: otp,
            expiresAt: expiresAt.toISOString(),
            attempts: 0
          }
        }
      });
    }
    
    // If user doesn't exist, create a temporary record in a separate OTP table
    // This is just for tracking OTPs for non-existing users
    else {
      await supabaseAdmin.from("temporary_otps").upsert(
        {
          phone,
          otp: otp,
          expires_at: expiresAt.toISOString(),
          attempts: 0,
          user_type: userType
        },
        { onConflict: "phone" }
      );
    }
    
    // In production, send SMS with the OTP using a service like Twilio or SendGrid
    // For this implementation, we'll log it to the console and return it (for testing purposes only)
    console.log(`[DEV ONLY] OTP for ${phone}: ${otp}`);
    
    // In production, DO NOT return the OTP in the response
    // For development purposes, we're including it
    return new Response(
      JSON.stringify({ 
        success: true,
        message: "OTP sent successfully",
        otp: otp, // Remove this in production!
        expiresIn: 600 // 10 minutes in seconds
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
    
  } catch (error) {
    console.error("Error sending OTP:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
