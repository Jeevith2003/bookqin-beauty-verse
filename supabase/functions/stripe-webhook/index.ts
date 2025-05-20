
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import Stripe from "https://esm.sh/stripe@12.18.0";

serve(async (req) => {
  try {
    // Get the request body
    const body = await req.text();
    
    // Get the signature from the header
    const signature = req.headers.get("stripe-signature");
    
    if (!signature) {
      return new Response("Webhook signature missing", { status: 400 });
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
      apiVersion: "2023-10-16",
    });

    // Verify the webhook signature
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? ""
    );

    // Initialize Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        
        // Get the payment intent from our database
        const { data: paymentIntent, error: paymentIntentError } = await supabaseAdmin
          .from("payment_intents")
          .select("*")
          .eq("stripe_payment_intent_id", session.payment_intent)
          .single();

        if (paymentIntentError) {
          console.error("Payment intent not found:", paymentIntentError);
          break;
        }

        // Update payment intent status
        await supabaseAdmin
          .from("payment_intents")
          .update({
            status: "completed",
            updated_at: new Date().toISOString()
          })
          .eq("id", paymentIntent.id);

        // Check if this is an appointment payment
        if (paymentIntent.appointment_id) {
          // Update appointment payment status
          await supabaseAdmin
            .from("appointments")
            .update({
              payment_status: "completed",
              updated_at: new Date().toISOString()
            })
            .eq("id", paymentIntent.appointment_id);

          // Create a notification for the user
          await supabaseAdmin
            .from("notifications")
            .insert({
              user_id: paymentIntent.customer_id,
              title: "Payment Successful",
              body: `Your payment of ₹${paymentIntent.amount} for booking has been processed successfully`,
              type: "payment",
              appointment_id: paymentIntent.appointment_id,
              created_at: new Date().toISOString()
            });
        }
        // Check if this is an add-to-wallet payment
        else if (paymentIntent.metadata?.action === "add-to-wallet") {
          // Add amount to user wallet
          await supabaseAdmin.rpc("add_to_wallet", {
            p_user_id: paymentIntent.customer_id,
            p_amount: paymentIntent.amount,
            p_description: "Added to wallet"
          });
        }
        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object;
        
        // Get the payment intent from our database
        const { data: paymentIntent, error: paymentIntentError } = await supabaseAdmin
          .from("payment_intents")
          .select("*")
          .eq("stripe_payment_intent_id", session.payment_intent)
          .single();

        if (paymentIntentError) {
          console.error("Payment intent not found:", paymentIntentError);
          break;
        }

        // Update payment intent status
        await supabaseAdmin
          .from("payment_intents")
          .update({
            status: "cancelled",
            updated_at: new Date().toISOString()
          })
          .eq("id", paymentIntent.id);

        // If this is an appointment payment, update the appointment payment status
        if (paymentIntent.appointment_id) {
          await supabaseAdmin
            .from("appointments")
            .update({
              payment_status: "failed",
              updated_at: new Date().toISOString()
            })
            .eq("id", paymentIntent.appointment_id);
        }
        break;
      }

      // Add more event handlers as needed
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return new Response(`Webhook error: ${error.message}`, { status: 400 });
  }
});
