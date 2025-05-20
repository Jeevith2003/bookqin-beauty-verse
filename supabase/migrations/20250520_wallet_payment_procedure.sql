
-- Function to process wallet payment in a transaction
CREATE OR REPLACE FUNCTION public.process_wallet_payment(
  p_user_id UUID,
  p_appointment_id UUID,
  p_amount INTEGER,
  p_description TEXT
) RETURNS void 
LANGUAGE plpgsql
AS $$
BEGIN
  -- Deduct amount from user wallet
  UPDATE public.profiles
  SET wallet_balance = wallet_balance - p_amount,
      updated_at = now()
  WHERE id = p_user_id;
  
  -- Add transaction record
  INSERT INTO public.wallet_transactions (
    user_id,
    amount,
    type,
    status,
    description,
    appointment_id,
    created_at
  ) VALUES (
    p_user_id,
    p_amount,
    'debit',
    'completed',
    p_description,
    p_appointment_id,
    now()
  );
  
  -- Update appointment payment status
  UPDATE public.appointments
  SET payment_status = 'completed',
      payment_method = 'wallet',
      updated_at = now()
  WHERE id = p_appointment_id;
  
  -- Create notification for user
  INSERT INTO public.notifications (
    user_id,
    title,
    body,
    type,
    appointment_id,
    created_at
  ) VALUES (
    p_user_id,
    'Payment Successful',
    'Your payment of ₹' || p_amount || ' has been processed successfully',
    'payment',
    p_appointment_id,
    now()
  );
END;
$$;
