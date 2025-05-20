
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
    // Get auth token from request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing Authorization header");
    }

    // Initialize Supabase client with anon key for auth check
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Verify the user is authenticated
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);

    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    // Initialize Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { appointmentId, amount } = await req.json();

    // Check if amount is valid
    if (!amount || amount <= 0) {
      throw new Error("Invalid amount");
    }

    // Check if appointment exists and belongs to user
    const { data: appointment, error: appointmentError } = await supabaseAdmin
      .from("appointments")
      .select("*")
      .eq("id", appointmentId)
      .eq("customer_id", user.id)
      .single();

    if (appointmentError) {
      throw new Error("Appointment not found or doesn't belong to you");
    }

    // Check if user has sufficient wallet balance
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("wallet_balance")
      .eq("id", user.id)
      .single();

    if (profileError) {
      throw profileError;
    }

    const walletBalance = profile.wallet_balance || 0;

    if (walletBalance < amount) {
      return new Response(
        JSON.stringify({ error: "Insufficient wallet balance", balance: walletBalance }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Begin transaction to process payment
    // 1. Deduct amount from user wallet
    // 2. Add transaction record
    // 3. Update appointment payment status
    
    // Start a transaction
    const { error: transactionError } = await supabaseAdmin.rpc('process_wallet_payment', {
      p_user_id: user.id,
      p_appointment_id: appointmentId,
      p_amount: amount,
      p_description: `Payment for booking #${appointmentId.substring(0, 8)}`
    });

    if (transactionError) {
      throw transactionError;
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Payment processed successfully",
        new_balance: walletBalance - amount
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Error processing wallet payment:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
