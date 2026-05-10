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
import { authRedirectUrl } from "@/lib/supabase";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { signInWithGoogle, signInWithPassword, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const redirectUrl =
    typeof window !== "undefined" ? authRedirectUrl() : "";
  const isDev =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname.startsWith("127.") ||
      window.location.hostname.endsWith(".lovable.app"));

  if (user) {
    setTimeout(() => setLocation("/dashboard"), 0);
  }

  const handleGoogle = async () => {
    setBusy(true);
    const { error } = await signInWithGoogle();
    setBusy(false);
    if (error) toast({ title: "Couldn't sign in", description: error, variant: "destructive" });
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setBusy(true);
    const { error } = await signInWithPassword(email, password);
    setBusy(false);
    if (error) {
      toast({ title: "Couldn't sign in", description: error, variant: "destructive" });
      return;
    }
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-[100dvh] w-full bg-secondary flex justify-center">
      <div className="w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col p-6 pt-16">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col justify-center">
          <h1 className="font-serif text-[28px] text-primary font-semibold tracking-[-0.5px] text-center">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground text-center">Sign in to continue your care.</p>

          <form onSubmit={handleEmail} className="mt-10 space-y-3">
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label>Password</Label>
              <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" autoComplete="current-password" />
            </div>
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-xs text-primary font-medium hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" size="xl" className="w-full" disabled={busy}>
              <Lock size={18} /> Sign in
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

          {isDev && redirectUrl && (
            <div className="mt-6 p-3 rounded-md border border-dashed border-border bg-muted/40">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                Auth diagnostics (dev only)
              </p>
              <p className="text-xs font-mono break-all text-foreground/80">
                {redirectUrl}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">
                Add this URL to Cloud → Users → URL Configuration → Additional Redirect URLs.
              </p>
            </div>
          )}
        </motion.div>

        <p className="text-sm text-center text-muted-foreground pb-4">
          New here?{" "}
          <Link href="/signup" className="text-primary font-semibold">Create an account</Link>
        </p>
      </div>
    </div>
  );
}