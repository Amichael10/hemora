export { supabase } from "@/integrations/supabase/client";

export function authRedirectUrl() {
  if (typeof window === "undefined") return "/auth/callback";
  return `${window.location.origin}/auth/callback`;
}