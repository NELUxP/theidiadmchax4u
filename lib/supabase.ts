import { createClient } from "@supabase/supabase-js";

// Type-safe environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Throw clear error messages during build if env vars are missing
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(`
    Supabase environment variables not set!
    Please ensure the following are set in your environment:
    - NEXT_PUBLIC_SUPABASE_URL
    - NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    If developing locally, add them to your .env.local file
  `);
}

// Create a singleton Supabase client
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Server-side safe client
export const getServerSupabase = () => {
  return createClient(
    process.env.SUPABASE_URL || supabaseUrl,
    process.env.SUPABASE_ANON_KEY || supabaseAnonKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );
};

export default supabaseClient;