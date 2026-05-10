import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { LockBold as Lock, CheckCircleBold as CheckCircle2 } from "solar-icon-set";

/**
 * Supabase password recovery flow:
 *  - User clicks the reset link from email → lands here with a hash like
 *    `#access_token=...&type=recovery`.
 *  - The Supabase client auto-detects the hash on load, sets a temporary
 *    session, and fires a PASSWORD_RECOVERY auth event.
 *  - We render a "set new password" form and call `updateUser({ password })`.
 *  - On success, the user is signed in with the new password; redirect home.
 */
export default function ResetPassword() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    // Give the Supabase client a tick to parse the URL hash and set the session.
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      if (data.session) {
        setReady(true);
        return;
      }
      // Wait briefly for the auth listener — recovery hash parsing is async.
      const sub = supabase.auth.onAuthStateChange((event, s) => {
        if (cancelled) return;
        if (event === "PASSWORD_RECOVERY" || s) {
          setReady(true);
        }
      });
      // Timeout after 2.5s — if we still have no session, the link is invalid/expired.
      setTimeout(() => {
        if (cancelled) return;
        if (!ready) {
          supabase.auth.getSession().then(({ data: d }) => {
            if (cancelled) return;
            if (d.session) setReady(true);
            else setSessionError("This reset link is invalid or has expired. Please request a new one.");
          });
        }
        sub.data.subscription.unsubscribe();
      }, 2500);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast({ title: "Password too short", description: "Use at least 8 characters.", variant: "destructive" });
      return;
    }
    if (password !== confirm) {
      toast({ title: "Passwords don't match", description: "Please re-enter the same password.", variant: "destructive" });
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast({ title: "Couldn't update password", description: error.message, variant: "destructive" });
      return;
    }
    setDone(true);
    setTimeout(() => setLocation("/dashboard"), 1500);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-secondary flex justify-center">
      <div className="w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col p-6 pt-16">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col justify-center">
          {done ? (
            <div className="text-center space-y-4">
              <span className="mx-auto inline-flex text-primary"><CheckCircle2 size={48} /></span>
              <h1 className="font-serif text-[24px] text-primary font-semibold">Password updated</h1>
              <p className="text-sm text-muted-foreground">Signing you in…</p>
            </div>
          ) : sessionError ? (
            <div className="text-center space-y-4">
              <h1 className="font-serif text-[22px] text-primary font-semibold">Link expired</h1>
              <p className="text-sm text-muted-foreground" data-testid="text-reset-error">{sessionError}</p>
              <Link
                href="/forgot-password"
                className="inline-block text-primary font-semibold text-sm underline"
              >
                Request a new link
              </Link>
            </div>
          ) : !ready ? (
            <div className="text-center space-y-3">
              <div className="w-10 h-10 mx-auto rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <p className="text-sm text-muted-foreground">Verifying your reset link…</p>
            </div>
          ) : (
            <>
              <h1 className="font-serif text-[28px] text-primary font-semibold tracking-[-0.5px] text-center">
                Set a new password
              </h1>
              <p className="mt-2 text-sm text-muted-foreground text-center">
                Choose a strong password you don't use anywhere else.
              </p>

              <form onSubmit={handleSubmit} className="mt-10 space-y-3">
                <div className="space-y-1.5">
                  <Label>New password</Label>
                  <Input
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    data-testid="input-reset-password"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Confirm password</Label>
                  <Input
                    type="password"
                    required
                    minLength={8}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Re-enter password"
                    autoComplete="new-password"
                    data-testid="input-reset-confirm"
                  />
                </div>
                <Button type="submit" size="xl" className="w-full" disabled={busy} data-testid="button-reset-submit">
                  <Lock size={18} /> {busy ? "Updating…" : "Update password"}
                </Button>
              </form>
            </>
          )}
        </motion.div>

        <p className="text-sm text-center text-muted-foreground pb-4">
          <Link href="/login" className="text-primary font-semibold">Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
