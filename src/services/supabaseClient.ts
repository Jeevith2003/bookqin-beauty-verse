
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with default values if env vars are not available
// This ensures the app doesn't crash during development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
