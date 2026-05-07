import { useEffect, useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProfileProvider } from "@/context/ProfileContext";
import { AuthProvider } from "@/context/AuthContext";

import Splash from "@/pages/splash";
import Onboarding from "@/pages/onboarding";
import Dashboard from "@/pages/dashboard";
import Crisis from "@/pages/crisis";
import Meds from "@/pages/meds";
import Records from "@/pages/records";
import Directory from "@/pages/directory";
import DirectoryDetail from "@/pages/directory-detail";
import Emergency from "@/pages/emergency";
import AuthCallback from "@/pages/auth-callback";
import Profile from "@/pages/profile";
import NotFound from "@/pages/not-found";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Splash} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/auth/callback" component={AuthCallback} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/crisis" component={Crisis} />
      <Route path="/meds" component={Meds} />
      <Route path="/records" component={Records} />
      <Route path="/directory" component={Directory} />
      <Route path="/directory/:id" component={DirectoryDetail} />
      <Route path="/emergency" component={Emergency} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function AppRouter() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className="min-h-[100dvh] w-full bg-secondary" />;
  }
  return (
    <AuthProvider>
      <ProfileProvider>
        <TooltipProvider>
          <WouterRouter>
            <Routes />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}