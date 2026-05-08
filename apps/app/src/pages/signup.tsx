import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import { LetterBold as Mail } from "solar-icon-set";

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { signInWithGoogle, signInWithEmail, user } = useAuth();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

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
    if (!email) return;
    setBusy(true);
    const { error } = await signInWithEmail(email);
    setBusy(false);
    if (error) {
      toast({ title: "Couldn't send link", description: error, variant: "destructive" });
    } else {
      toast({ title: "Check your email", description: "We sent you a link to confirm your account." });
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-secondary flex justify-center">
      <div className="w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col p-6 pt-16">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col justify-center">
          <h1 className="font-serif text-[28px] text-primary font-semibold tracking-[-0.5px] text-center">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground text-center">Start tracking care for you and your loved ones.</p>

          <form onSubmit={handleEmail} className="mt-10 space-y-3">
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <Button type="submit" size="xl" className="w-full" disabled={busy}>
              <Mail size={18} /> Sign up with email
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

        <p className="text-sm text-center text-muted-foreground pb-4">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold">Sign in</Link>
        </p>
      </div>
    </div>
  );
}