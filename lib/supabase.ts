import { createClient } from "@supabase/supabase-js";

// Safely get environment variables
const getSupabaseUrl = () => {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  }
  return process.env.SUPABASE_URL || '';
};

const getSupabaseKey = () => {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  }
  return process.env.SUPABASE_ANON_KEY || '';
};

export const supabase = createClient(getSupabaseUrl(), getSupabaseKey(), {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});