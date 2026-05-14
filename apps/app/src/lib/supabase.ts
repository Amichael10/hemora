export { supabase } from "@/integrations/supabase/client";

export function authRedirectUrl() {
  if (typeof window === "undefined") return "/auth/callback";
  const origin = window.location.origin;
  return `${origin}/auth/callback`;
}