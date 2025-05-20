
-- Create schema for users (extending Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  phone TEXT UNIQUE,
  email TEXT,
  profile_image TEXT,
  type TEXT NOT NULL CHECK (type IN ('customer', 'salon')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  wallet_balance INTEGER DEFAULT 0,
  notifications BOOLEAN DEFAULT true,
  preferred_gender TEXT CHECK (preferred_gender IN ('male', 'female', 'all')),
  allow_in_home_service BOOLEAN DEFAULT false
);

-- Create schema for salons
CREATE TABLE public.salons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  rating FLOAT DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  images TEXT[],
  description TEXT,
  verified BOOLEAN DEFAULT false,
  gender_inclusive BOOLEAN DEFAULT true,
  in_home_service BOOLEAN DEFAULT false,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  wallet_balance INTEGER DEFAULT 0,
  platform_fee_percentage INTEGER DEFAULT 15,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create schema for salon working hours
CREATE TABLE public.salon_working_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
  day_of_week TEXT NOT NULL CHECK (day_of_week IN ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday')),
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN DEFAULT false,
  UNIQUE (salon_id, day_of_week)
);

-- Create schema for salon banking details
CREATE TABLE public.salon_bank_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
  account_number TEXT NOT NULL,
  ifsc TEXT NOT NULL,
  account_holder_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (salon_id)
);

-- Create schema for service categories
CREATE TABLE public.service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create schema for services
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  category_id UUID REFERENCES public.service_categories(id),
  image TEXT,
  gender_specific TEXT CHECK (gender_specific IN ('male', 'female', 'all')),
  in_home_available BOOLEAN DEFAULT false,
  in_home_price_extra INTEGER DEFAULT 0,
  popularity_score INTEGER DEFAULT 0,
  discount_percentage INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create schema for service add-ons
CREATE TABLE public.service_addons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  description TEXT,
  required BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create schema for stylists
CREATE TABLE public.stylists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  profile_image TEXT,
  specialties TEXT[],
  rating FLOAT DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  bio TEXT,
  experience INTEGER, -- in years
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  in_home_service_available BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create schema for stylist availability
CREATE TABLE public.stylist_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stylist_id UUID NOT NULL REFERENCES public.stylists(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time_slots TEXT[], -- array of time slots like ["10:00", "11:00"]
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (stylist_id, date)
);

-- Create schema for appointments
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES public.services(id),
  stylist_id UUID NOT NULL REFERENCES public.stylists(id),
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'rescheduled', 'no-show')),
  in_home BOOLEAN NOT NULL DEFAULT false,
  total_amount INTEGER NOT NULL,
  payment_method TEXT CHECK (payment_method IN ('upi', 'card', 'cash', 'wallet')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'refunded', 'failed')),
  notes TEXT,
  rating INTEGER,
  review TEXT,
  refund_amount INTEGER,
  booking_reference TEXT UNIQUE,
  reschedule_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create schema for appointment add-ons
CREATE TABLE public.appointment_addons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
  addon_id UUID NOT NULL REFERENCES public.service_addons(id),
  price INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create schema for wallet transactions
CREATE TABLE public.wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('credit', 'debit')),
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  description TEXT NOT NULL,
  reference TEXT,
  appointment_id UUID REFERENCES public.appointments(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create schema for notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('booking', 'payment', 'system', 'promotion')),
  read BOOLEAN DEFAULT false,
  action_link TEXT,
  appointment_id UUID REFERENCES public.appointments(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create schema for payment intents
CREATE TABLE public.payment_intents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_payment_intent_id TEXT UNIQUE,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'inr',
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  payment_method TEXT,
  appointment_id UUID REFERENCES public.appointments(id),
  customer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  payment_url TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Set up Row Level Security (RLS) policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salon_working_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salon_bank_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stylists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stylist_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointment_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_intents ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Salon policies
CREATE POLICY "Salon owners can view their own salons"
  ON public.salons FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Salon owners can update their own salons"
  ON public.salons FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Anyone can view verified salons"
  ON public.salons FOR SELECT
  USING (verified = true);

-- More RLS policies would be added for each table...
