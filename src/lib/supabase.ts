import { Capacitor } from '@capacitor/core';

export { supabase } from "@/integrations/supabase/client";

export function authRedirectUrl() {
  if (Capacitor.isNativePlatform()) {
    return "hemora://auth/callback";
  }
  if (typeof window === "undefined") return "/auth/callback";
  return `${window.location.origin}/auth/callback`;
}