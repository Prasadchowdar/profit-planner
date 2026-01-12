-- Add length constraint to profiles.full_name for defense in depth
-- This ensures server-side validation even if client validation is bypassed

ALTER TABLE public.profiles
ADD CONSTRAINT profiles_full_name_length 
CHECK (full_name IS NULL OR char_length(full_name) <= 100);

-- Update handle_new_user function with server-side validation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  sanitized_name TEXT;
BEGIN
  -- Validate and sanitize full_name from user metadata
  -- Trim whitespace and limit to 100 characters
  sanitized_name := TRIM(SUBSTRING(new.raw_user_meta_data ->> 'full_name', 1, 100));
  
  -- Insert profile with sanitized name (or NULL if empty)
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (
    new.id, 
    NULLIF(sanitized_name, '')
  );
  
  RETURN new;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail auth - profile can be created later
    RAISE WARNING 'Profile creation failed for user %: %', new.id, SQLERRM;
    RETURN new;
END;
$$;