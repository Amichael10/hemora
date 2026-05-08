import { useEffect, useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProfileProvider } from "@/context/ProfileContext";
import { AuthProvider } from "@/context/AuthContext";

import Splash from "@/pages/splash";
import Landing from "@/pages/landing";
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
import ProfileEdit from "@/pages/profile-edit";
import NotFound from "@/pages/not-found";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import MedForm from "@/pages/med-form";
import MedDetail from "@/pages/med-detail";
import RecordForm from "@/pages/record-form";
import CrisisDetail from "@/pages/crisis-detail";
import CrisisInsights from "@/pages/crisis-insights";
import CrisisShare from "@/pages/crisis-share";
import Settings from "@/pages/settings";
import Contacts from "@/pages/contacts";
import Notifications from "@/pages/notifications";
import GenotypeChecker from "@/pages/genotype-checker";
import Family from "@/pages/family";
import SchoolLetter from "@/pages/school-letter";
import Resources from "@/pages/resources";
import ResourceDetail from "@/pages/resource-detail";
import { About, Help, Privacy, Terms } from "@/pages/info";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/welcome" component={Splash} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/auth/callback" component={AuthCallback} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/crisis" component={Crisis} />
      <Route path="/crisis/insights" component={CrisisInsights} />
      <Route path="/crisis/share" component={CrisisShare} />
      <Route path="/crisis/:id" component={CrisisDetail} />
      <Route path="/meds" component={Meds} />
      <Route path="/meds/new" component={MedForm} />
      <Route path="/meds/:id/edit" component={MedForm} />
      <Route path="/meds/:id" component={MedDetail} />
      <Route path="/records" component={Records} />
      <Route path="/records/:id" component={RecordForm} />
      <Route path="/directory" component={Directory} />
      <Route path="/directory/:id" component={DirectoryDetail} />
      <Route path="/emergency" component={Emergency} />
      <Route path="/profile" component={Profile} />
      <Route path="/profile/edit" component={ProfileEdit} />
      <Route path="/settings" component={Settings} />
      <Route path="/settings/contacts" component={Contacts} />
      <Route path="/settings/notifications" component={Notifications} />
      <Route path="/genotype-checker" component={GenotypeChecker} />
      <Route path="/family" component={Family} />
      <Route path="/school-letter" component={SchoolLetter} />
      <Route path="/resources" component={Resources} />
      <Route path="/resources/:id" component={ResourceDetail} />
      <Route path="/help" component={Help} />
      <Route path="/about" component={About} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
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