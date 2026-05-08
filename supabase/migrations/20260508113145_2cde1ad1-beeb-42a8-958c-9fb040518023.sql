ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url text;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  meta jsonb := COALESCE(NEW.raw_user_meta_data, '{}'::jsonb);
  resolved_name text;
  resolved_avatar text;
BEGIN
  resolved_name := COALESCE(
    NULLIF(meta->>'full_name', ''),
    NULLIF(meta->>'name', ''),
    NULLIF(TRIM(CONCAT_WS(' ', meta->>'given_name', meta->>'family_name')), ''),
    NEW.email
  );
  resolved_avatar := COALESCE(
    NULLIF(meta->>'avatar_url', ''),
    NULLIF(meta->>'picture', '')
  );

  INSERT INTO public.profiles (user_id, full_name, avatar_url)
  VALUES (NEW.id, resolved_name, resolved_avatar);
  RETURN NEW;
END;
$function$;