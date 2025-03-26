// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// Type-safe environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Throw clear error messages during build if env vars are missing
if (!supabaseUrl || !supabaseKey) {
  throw new Error(`
    Supabase environment variables not set!
    Please ensure the following are set in your Netlify environment:
    - NEXT_PUBLIC_SUPABASE_URL
    - NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    If developing locally, add them to your .env.local file
  `);
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    // Recommended settings for Next.js
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  // Global headers example (optional)
  global: {
    headers: {
      'X-Application-Name': 'MCHAX4U'
    }
  }
});

// Optional: Add a helper function for server-side usage
export const getServerSupabase = (accessToken?: string) => {
  if (!accessToken) return supabase;
  
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  });
};