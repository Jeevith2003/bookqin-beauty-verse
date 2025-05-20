
-- Function to add money to wallet
CREATE OR REPLACE FUNCTION public.add_to_wallet(
  p_user_id UUID,
  p_amount INTEGER,
  p_description TEXT
) RETURNS void 
LANGUAGE plpgsql
AS $$
BEGIN
  -- Add amount to user wallet
  UPDATE public.profiles
  SET wallet_balance = wallet_balance + p_amount,
      updated_at = now()
  WHERE id = p_user_id;
  
  -- Add transaction record
  INSERT INTO public.wallet_transactions (
    user_id,
    amount,
    type,
    status,
    description,
    created_at
  ) VALUES (
    p_user_id,
    p_amount,
    'credit',
    'completed',
    p_description,
    now()
  );
  
  -- Create notification for user
  INSERT INTO public.notifications (
    user_id,
    title,
    body,
    type,
    created_at
  ) VALUES (
    p_user_id,
    'Wallet Updated',
    'Your wallet has been credited with ₹' || p_amount,
    'payment',
    now()
  );
END;
$$;
