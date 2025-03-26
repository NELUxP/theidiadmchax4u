-- Create a table for public profiles
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Set up Row Level Security (RLS)
-- First, enable RLS on the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
-- 1. Allow users to view their own profile
CREATE POLICY "Users can view own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

-- 2. Allow users to update their own profile
CREATE POLICY "Users can update own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- 3. Allow new users to insert their profile once
CREATE POLICY "Users can insert own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- 4. Prevent users from deleting profiles
CREATE POLICY "Users cannot delete profiles" 
  ON public.profiles 
  FOR DELETE 
  USING (false);

-- Create a trigger to create a profile entry when a new user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (new.id, new.raw_user_meta_data->>'username');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create a function to update a user's profile
CREATE OR REPLACE FUNCTION update_profile(
  username_arg TEXT
) RETURNS SETOF profiles AS $$
BEGIN
  UPDATE public.profiles
  SET 
    username = COALESCE(username_arg, username),
    updated_at = now()
  WHERE id = auth.uid()
  RETURNING *;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a view that joins user auth data with profile data
-- Use SECURITY INVOKER when creating the view
CREATE VIEW public.user_profiles WITH (security_invoker=true) AS
  SELECT 
    profiles.id,
    profiles.username,
    users.email,
    profiles.created_at,
    profiles.updated_at
  FROM public.profiles
  JOIN auth.users ON profiles.id = users.id;

-- Create policy for the view (not needed since we're using security_invoker=true)
-- But we'll add a policy for the underlying profiles table to be safe
CREATE POLICY "Users can only view their own profile in user_profiles"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

