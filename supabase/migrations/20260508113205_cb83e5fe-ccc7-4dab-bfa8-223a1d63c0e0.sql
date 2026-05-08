UPDATE public.profiles p
SET
  avatar_url = COALESCE(p.avatar_url, NULLIF(u.raw_user_meta_data->>'avatar_url',''), NULLIF(u.raw_user_meta_data->>'picture','')),
  full_name = COALESCE(NULLIF(p.full_name,''), NULLIF(u.raw_user_meta_data->>'full_name',''), NULLIF(u.raw_user_meta_data->>'name',''), p.full_name)
FROM auth.users u
WHERE p.user_id = u.id;