import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { LetterBold as Mail, CheckCircleBold as CheckCircle2 } from "solar-icon-set";

export default function ForgotPassword() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setBusy(true);
    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/reset-password`
        : "/reset-password";
    const { error } = await supabase.auth.resetPasswordForEmail(trimmed, { redirectTo });
    setBusy(false);
    if (error) {
      toast({ title: "Couldn't send reset email", description: error.message, variant: "destructive" });
      return;
    }
    setSent(true);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-secondary flex justify-center">
      <div className="w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col p-6 pt-16">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col justify-center">
          {!sent ? (
            <>
              <h1 className="font-serif text-[28px] text-primary font-semibold tracking-[-0.5px] text-center">
                Reset your password
              </h1>
              <p className="mt-2 text-sm text-muted-foreground text-center">
                Enter your email and we'll send you a link to set a new password.
              </p>

              <form onSubmit={handleSubmit} className="mt-10 space-y-3">
                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    data-testid="input-forgot-email"
                  />
                </div>
                <Button type="submit" size="xl" className="w-full" disabled={busy} data-testid="button-forgot-submit">
                  <Mail size={18} /> {busy ? "Sending…" : "Send reset link"}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-4">
              <span className="mx-auto inline-flex text-primary"><CheckCircle2 size={48} /></span>
              <h1 className="font-serif text-[24px] text-primary font-semibold">Check your inbox</h1>
              <p className="text-sm text-muted-foreground">
                If an account exists for <span className="text-primary">{email}</span>, you'll receive a password reset link shortly.
              </p>
            </div>
          )}
        </motion.div>

        <p className="text-sm text-center text-muted-foreground pb-4 py-[12px]">
          Remembered it?{" "}
          <Link href="/login" className="text-primary font-semibold">Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
