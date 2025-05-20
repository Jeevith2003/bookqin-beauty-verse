
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
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
    const { phone, otp, userType } = await req.json();
    
    // Validate phone number
    if (!phone || typeof phone !== "string" || !phone.match(/^\+[0-9]{10,15}$/)) {
      return new Response(
        JSON.stringify({ error: "Invalid phone number format" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }
    
    // Validate OTP
    if (!otp || typeof otp !== "string" || !otp.match(/^\d{6}$/)) {
      return new Response(
        JSON.stringify({ error: "Invalid OTP format" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Validate user type
    if (!userType || (userType !== "customer" && userType !== "salon")) {
      return new Response(
        JSON.stringify({ error: "Invalid user type" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Initialize Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );
    
    // Check if a user with this phone number already exists
    const { data: existingUser, error: lookupError } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("phone", phone)
      .maybeSingle();
    
    if (lookupError) {
      throw lookupError;
    }
    
    // Case 1: Existing user - verify OTP and sign in
    if (existingUser) {
      // Get user with metadata
      const { data: userData, error: userError } = await supabaseAdmin
        .auth.admin.getUserById(existingUser.id);
      
      if (userError) {
        throw userError;
      }
      
      const userOtp = userData.user.user_metadata?.otp;
      
      // Validate OTP
      if (!userOtp || userOtp.code !== otp) {
        // Update attempts count
        await supabaseAdmin.auth.admin.updateUserById(existingUser.id, {
          user_metadata: { 
            otp: {
              ...userOtp,
              attempts: (userOtp?.attempts || 0) + 1
            }
          }
        });
        
        return new Response(
          JSON.stringify({ error: "Invalid OTP" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }
      
      // Check if OTP is expired
      if (new Date(userOtp.expiresAt) < new Date()) {
        return new Response(
          JSON.stringify({ error: "OTP has expired" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }
      
      // Check if too many attempts
      if (userOtp.attempts >= 3) {
        return new Response(
          JSON.stringify({ error: "Too many attempts. Please request a new OTP" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }
      
      // OTP is valid, sign in the user
      const { data: sessionData, error: sessionError } = await supabaseAdmin.auth.admin.createSession({
        userId: existingUser.id
      });
      
      if (sessionError) {
        throw sessionError;
      }
      
      // Clear the OTP
      await supabaseAdmin.auth.admin.updateUserById(existingUser.id, {
        user_metadata: { otp: null }
      });
      
      return new Response(
        JSON.stringify({ 
          success: true,
          message: "OTP verified and user authenticated",
          session: sessionData 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }
    
    // Case 2: New user - verify OTP and sign up
    else {
      // Get temporary OTP
      const { data: tempOtp, error: tempOtpError } = await supabaseAdmin
        .from("temporary_otps")
        .select("*")
        .eq("phone", phone)
        .single();
      
      if (tempOtpError) {
        return new Response(
          JSON.stringify({ error: "No OTP found for this phone number" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 404 }
        );
      }
      
      // Validate OTP
      if (tempOtp.otp !== otp) {
        // Update attempts count
        await supabaseAdmin.from("temporary_otps").update({
          attempts: tempOtp.attempts + 1
        }).eq("phone", phone);
        
        return new Response(
          JSON.stringify({ error: "Invalid OTP" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }
      
      // Check if OTP is expired
      if (new Date(tempOtp.expires_at) < new Date()) {
        return new Response(
          JSON.stringify({ error: "OTP has expired" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }
      
      // Check if too many attempts
      if (tempOtp.attempts >= 3) {
        return new Response(
          JSON.stringify({ error: "Too many attempts. Please request a new OTP" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }
      
      // OTP is valid, create a new user
      // Generate a random password
      const password = Array(16).fill(0).map(() => Math.random().toString(36).charAt(2)).join('');
      
      // Create the user in auth.users
      const { data: authUser, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
        phone,
        password,
        phone_confirm: true,
        user_metadata: { user_type: userType }
      });
      
      if (createUserError) {
        throw createUserError;
      }
      
      // Create profile for the user
      const { error: profileError } = await supabaseAdmin.from("profiles").insert({
        id: authUser.user.id,
        phone,
        type: userType as 'customer' | 'salon',
        created_at: new Date().toISOString()
      });
      
      if (profileError) {
        throw profileError;
      }
      
      // Create session for the new user
      const { data: sessionData, error: sessionError } = await supabaseAdmin.auth.admin.createSession({
        userId: authUser.user.id
      });
      
      if (sessionError) {
        throw sessionError;
      }
      
      // Delete the temporary OTP
      await supabaseAdmin.from("temporary_otps").delete().eq("phone", phone);
      
      return new Response(
        JSON.stringify({ 
          success: true,
          message: "OTP verified and new user created",
          session: sessionData 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }
    
  } catch (error) {
    console.error("Error verifying OTP:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
