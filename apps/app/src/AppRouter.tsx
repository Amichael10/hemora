import { useEffect, useState, lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProfileProvider } from "@/context/ProfileContext";
import { AuthProvider } from "@/context/AuthContext";

// Lazy load pages
const Splash = lazy(() => import("@/pages/splash"));
const Landing = lazy(() => import("@/pages/landing"));
const Onboarding = lazy(() => import("@/pages/onboarding"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Crisis = lazy(() => import("@/pages/crisis"));
const Meds = lazy(() => import("@/pages/meds"));
const Records = lazy(() => import("@/pages/records"));
const Directory = lazy(() => import("@/pages/directory"));
const DirectoryDetail = lazy(() => import("@/pages/directory-detail"));
const Emergency = lazy(() => import("@/pages/emergency"));
const AuthCallback = lazy(() => import("@/pages/auth-callback"));
const Profile = lazy(() => import("@/pages/profile"));
const ProfileEdit = lazy(() => import("@/pages/profile-edit"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Login = lazy(() => import("@/pages/login"));
const Signup = lazy(() => import("@/pages/signup"));
const MedForm = lazy(() => import("@/pages/med-form"));
const MedDetail = lazy(() => import("@/pages/med-detail"));
const RecordForm = lazy(() => import("@/pages/record-form"));
const RecordDetail = lazy(() => import("@/pages/record-detail"));
const CrisisDetail = lazy(() => import("@/pages/crisis-detail"));
const CrisisInsights = lazy(() => import("@/pages/crisis-insights"));
const CrisisShare = lazy(() => import("@/pages/crisis-share"));
const Settings = lazy(() => import("@/pages/settings"));
const Contacts = lazy(() => import("@/pages/contacts"));
const Notifications = lazy(() => import("@/pages/notifications"));
const GenotypeChecker = lazy(() => import("@/pages/genotype-checker"));
const Family = lazy(() => import("@/pages/family"));
const SchoolLetter = lazy(() => import("@/pages/school-letter"));
const Resources = lazy(() => import("@/pages/resources"));
const ResourceDetail = lazy(() => import("@/pages/resource-detail"));

// Helper for Info pages
const About = lazy(() => import("@/pages/info").then(m => ({ default: m.About })));
const Help = lazy(() => import("@/pages/info").then(m => ({ default: m.Help })));
const Privacy = lazy(() => import("@/pages/info").then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import("@/pages/info").then(m => ({ default: m.Terms })));

/**
 * Host-based routing:
 * - app.hemora.xyz → always lands users inside the app (dashboard).
 *   Marketing routes (/, /about, /help, etc.) are redirected to /dashboard.
 * - Other hosts (hemora.xyz, www.hemora.xyz, staging.hemora.xyz, previews)
 *   keep the marketing landing page as the default.
 */
const APP_HOST_PREFIX = "app.";
const MARKETING_PATHS = new Set([
  "/",
  "/about",
  "/help",
  "/privacy",
  "/terms",
]);

function HostRedirect() {
  const [location, setLocation] = useLocation();
  useEffect(() => {
    if (typeof window === "undefined") return;
    const host = window.location.hostname;
    const isAppHost = host.startsWith(APP_HOST_PREFIX);
    if (isAppHost && MARKETING_PATHS.has(location)) {
      setLocation("/dashboard");
    }
  }, [location, setLocation]);
  return null;
}

function Routes() {
  return (
    <Suspense fallback={<div className="min-h-[100dvh] w-full bg-secondary flex items-center justify-center">Loading...</div>}>
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
        <Route path="/records/new" component={RecordForm} />
        <Route path="/records/:id/edit" component={RecordForm} />
        <Route path="/records/:id" component={RecordDetail} />
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
    </Suspense>
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
            <HostRedirect />
            <Routes />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}