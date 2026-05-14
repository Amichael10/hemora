import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import { LockBold as Lock } from "solar-icon-set";

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { signInWithGoogle, signUpWithPassword, verifyOtp, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  if (user) {
    setTimeout(() => setLocation("/dashboard"), 0);
  }

  const handleGoogle = async () => {
    setBusy(true);
    const { error } = await signInWithGoogle();
    setBusy(false);
    if (error) toast({ title: "Couldn't sign up", description: error, variant: "destructive" });
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (password.length < 8) {
      toast({ title: "Password too short", description: "Use at least 8 characters.", variant: "destructive" });
      return;
    }
    setBusy(true);
    const { error } = await signUpWithPassword(email, password);
    setBusy(false);
    if (error) {
      toast({ title: "Couldn't create account", description: error, variant: "destructive" });
      return;
    }
    setSentTo(email);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-secondary flex justify-center">
      <div className="w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col p-6 pt-16">
        {sentTo ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col justify-center text-center">
            <div className="mx-auto w-16 h-16 bg-[#0f3d3e]/10 rounded-2xl flex items-center justify-center mb-6">
              <Lock size={32} className="text-[#0f3d3e]" />
            </div>
            
            <h1 className="font-serif text-[28px] text-[#7d1d2e] font-semibold tracking-[-0.5px]">Check your inbox</h1>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              We've sent a verification link and code to <br />
              <span className="font-medium text-foreground">{sentTo}</span>
            </p>

            <div className="mt-10 space-y-6">
              <div className="space-y-3">
                <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Verification Code</Label>
                <div className="flex justify-center gap-2">
                  <Input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    placeholder="0 0 0 0 0 0"
                    className="h-14 text-center text-2xl font-bold tracking-[0.5em] w-full max-w-[240px] focus-visible:ring-[#0f3d3e]"
                    onChange={async (e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      if (val.length === 6) {
                        setBusy(true);
                        const { error } = await verifyOtp(sentTo, val, "signup");
                        setBusy(false);
                        if (error) {
                          toast({ title: "Invalid code", description: error, variant: "destructive" });
                        } else {
                          setLocation("/dashboard");
                        }
                      }
                    }}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Enter the 6-digit code from your email to continue.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <p className="text-xs text-muted-foreground">
                  Didn't get it? Check your spam folder or
                </p>
                <Button 
                  variant="link" 
                  className="text-[#7d1d2e] h-auto p-0 font-bold"
                  onClick={async () => {
                    setBusy(true);
                    const { error } = await signUpWithPassword(email, password);
                    setBusy(false);
                    if (error) {
                      toast({ title: "Couldn't resend", description: error, variant: "destructive" });
                    } else {
                      toast({ title: "Code resent", description: "Check your email again." });
                    }
                  }}
                >
                  Resend verification email
                </Button>
              </div>
            </div>

            <Button variant="outline" className="mt-12 w-full h-12 border-muted-foreground/20" onClick={() => setSentTo(null)}>
              Use a different email
            </Button>
          </motion.div>
        ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col justify-center">
          <h1 className="font-serif text-[28px] text-primary font-semibold tracking-[-0.5px] text-center">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground text-center">Start tracking care for you and your loved ones.</p>

          <form onSubmit={handleEmail} className="mt-10 space-y-3">
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label>Password</Label>
              <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" autoComplete="new-password" minLength={8} />
            </div>
            <Button type="submit" size="xl" className="w-full" disabled={busy}>
              <Lock size={18} /> Create account
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Button variant="outline" size="xl" className="w-full" onClick={handleGoogle} disabled={busy}>
            <FaGoogle className="w-[18px] h-[18px]" /> Continue with Google
          </Button>

          <p className="text-[11px] text-muted-foreground/80 text-center mt-6 leading-relaxed">
            By continuing you agree to our{" "}
            <Link href="/terms" className="underline">Terms</Link> and{" "}
            <Link href="/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </motion.div>
        )}

        <p className="text-sm text-center text-muted-foreground pb-4 py-[12px]">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold">Sign in</Link>
        </p>
      </div>
    </div>
  );
}