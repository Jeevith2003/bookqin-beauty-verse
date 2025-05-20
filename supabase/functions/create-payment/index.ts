
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import Stripe from "https://esm.sh/stripe@12.18.0";

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

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
      apiVersion: "2023-10-16",
    });

    const { appointmentId, amount, paymentMethod, action } = await req.json();

    // Check if amount is valid
    if (!amount || amount <= 0) {
      throw new Error("Invalid amount");
    }

    // Handle different payment scenarios
    let successUrl = "";
    let cancelUrl = "";
    let paymentDescription = "";
    let metadata = {};

    // Determine payment type and set appropriate URLs and metadata
    if (action === "add-to-wallet") {
      // Add to wallet payment flow
      successUrl = `${req.headers.get("origin")}/wallet?status=success`;
      cancelUrl = `${req.headers.get("origin")}/wallet?status=cancel`;
      paymentDescription = "Add money to Bookqin wallet";
      metadata = { action: "add-to-wallet", userId: user.id };
    } else if (appointmentId) {
      // Appointment payment flow
      // Get appointment details
      const { data: appointment, error: appointmentError } = await supabaseAdmin
        .from("appointments")
        .select("*")
        .eq("id", appointmentId)
        .single();
        
      if (appointmentError) {
        throw appointmentError;
      }
      
      // Validate the appointment belongs to the user
      if (appointment.customer_id !== user.id) {
        throw new Error("Unauthorized: This appointment doesn't belong to you");
      }
      
      successUrl = `${req.headers.get("origin")}/appointments/${appointmentId}?status=success`;
      cancelUrl = `${req.headers.get("origin")}/appointments/${appointmentId}?status=cancel`;
      paymentDescription = "Payment for booking #" + appointmentId.substring(0, 8);
      metadata = { appointmentId, userId: user.id };
    } else {
      throw new Error("Invalid payment request");
    }

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'upi'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: paymentDescription,
            },
            unit_amount: amount * 100, // convert to paise
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata,
      customer_email: user.email,
    });

    // Save payment intent to database
    const { data: paymentIntent, error: paymentIntentError } = await supabaseAdmin
      .from("payment_intents")
      .insert({
        stripe_payment_intent_id: session.payment_intent as string,
        amount: amount,
        currency: "inr",
        status: "pending",
        payment_method: paymentMethod,
        appointment_id: appointmentId || null,
        customer_id: user.id,
        payment_url: session.url,
        metadata: metadata,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (paymentIntentError) {
      throw paymentIntentError;
    }
    
    // If this is an appointment payment, update the appointment
    if (appointmentId) {
      await supabaseAdmin
        .from("appointments")
        .update({
          payment_method: paymentMethod,
          payment_status: "pending",
          updated_at: new Date().toISOString()
        })
        .eq("id", appointmentId);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        url: session.url,
        payment_intent_id: paymentIntent.id
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Error processing payment:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
