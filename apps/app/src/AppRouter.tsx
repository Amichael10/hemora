import { useEffect, useState, lazy, Suspense, ComponentType } from "react";
import { Switch, Route, Router as WouterRouter, Redirect, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProfileProvider } from "@/context/ProfileContext";
import { AuthProvider } from "@/context/AuthContext";
import { HemoraLoader } from "@/components/HemoraLoader";
import { RequireAuth } from "@/components/RequireAuth";
import { useAuth } from "@/context/AuthContext";

// Lazy load pages
const Splash = lazy(() => import("@/pages/splash"));
const Landing = lazy(() => import("@/pages/landing"));
const Onboarding = lazy(() => import("@/pages/onboarding"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Crisis = lazy(() => import("@/pages/crisis"));
const CrisisInsights = lazy(() => import("@/pages/crisis-insights"));
const CrisisShare = lazy(() => import("@/pages/crisis-share"));
const CrisisDetail = lazy(() => import("@/pages/crisis-detail"));
const Meds = lazy(() => import("@/pages/meds"));
const MedForm = lazy(() => import("@/pages/med-form"));
const MedDetail = lazy(() => import("@/pages/med-detail"));
const Records = lazy(() => import("@/pages/records"));
const RecordForm = lazy(() => import("@/pages/record-form"));
const RecordDetail = lazy(() => import("@/pages/record-detail"));
const Directory = lazy(() => import("@/pages/directory"));
const DirectoryDetail = lazy(() => import("@/pages/directory-detail"));
const Emergency = lazy(() => import("@/pages/emergency"));
const AuthCallback = lazy(() => import("@/pages/auth-callback"));
const Profile = lazy(() => import("@/pages/profile"));
const ProfileEdit = lazy(() => import("@/pages/profile-edit"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Login = lazy(() => import("@/pages/login"));
const Signup = lazy(() => import("@/pages/signup"));
const ForgotPassword = lazy(() => import("@/pages/forgot-password"));
const ResetPassword = lazy(() => import("@/pages/reset-password"));
const Settings = lazy(() => import("@/pages/settings"));
const Contacts = lazy(() => import("@/pages/contacts"));
const Notifications = lazy(() => import("@/pages/notifications"));
const NotificationSettings = lazy(() => import("@/pages/notification-settings"));
const AmbulancePage = lazy(() => import("@/pages/ambulance"));
const HospitalChecklist = lazy(() => import("@/pages/hospital-checklist"));
const GenotypeChecker = lazy(() => import("@/pages/genotype-checker"));
const Family = lazy(() => import("@/pages/family"));
const FamilyAdd = lazy(() => import("@/pages/family-add"));
const SchoolLetter = lazy(() => import("@/pages/school-letter"));
const Resources = lazy(() => import("@/pages/resources"));
const ResourceDetail = lazy(() => import("@/pages/resource-detail"));
const Brand = lazy(() => import("@/pages/brand"));
const Admin = lazy(() => import("@/pages/admin"));
const BlogIndex = lazy(() => import("@/pages/blog"));
const BlogPost = lazy(() => import("@/pages/blog-post"));
const Vitals = lazy(() => import("@/pages/vitals"));
const Hydration = lazy(() => import("@/pages/hydration"));
const VitalsForm = lazy(() => import("@/pages/vitals-form"));
const Transfusion = lazy(() => import("@/pages/transfusion"));
const TransfusionForm = lazy(() => import("@/pages/transfusion-form"));
const TransfusionDetail = lazy(() => import("@/pages/transfusion-detail"));
const TransfusionHistory = lazy(() => import("@/pages/transfusion-history"));
const IronMonitoring = lazy(() => import("@/pages/iron-monitoring"));
const Appointments = lazy(() => import("@/pages/appointments"));
const AppointmentForm = lazy(() => import("@/pages/appointments-form"));

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
  const { user, loading } = useAuth();
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (loading) return;
    const host = window.location.hostname;
    // Redirect if it's the app subdomain, OR if it's a capacitor mobile app (where host might be localhost or similar, but typically Capacitor uses a custom scheme. For now, we'll check if we're on app host or mobile)
    const isAppHost = host.startsWith(APP_HOST_PREFIX);
    if (isAppHost && MARKETING_PATHS.has(location)) {
      setLocation(user ? "/dashboard" : "/login");
    }
  }, [location, setLocation, user, loading]);
  
  return null;
}

const protect = <P extends object>(Component: ComponentType<P>) => {
  const Wrapped = (props: P) => (
    <RequireAuth>
      <Component {...props} />
    </RequireAuth>
  );
  Wrapped.displayName = `Protected(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

function Routes() {
  return (
    <Suspense fallback={<HemoraLoader />}>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/welcome" component={Splash} />
        <Route path="/onboarding" component={Onboarding} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/auth/callback" component={AuthCallback} />
        <Route path="/dashboard" component={protect(Dashboard)} />
        <Route path="/crisis" component={protect(Crisis)} />
        <Route path="/crisis/insights" component={protect(CrisisInsights)} />
        <Route path="/crisis/share" component={protect(CrisisShare)} />
        <Route path="/crisis/:id" component={protect(CrisisDetail)} />
        <Route path="/meds" component={protect(Meds)} />
        <Route path="/meds/new" component={protect(MedForm)} />
        <Route path="/meds/:id/edit" component={protect(MedForm)} />
        <Route path="/meds/:id" component={protect(MedDetail)} />
        <Route path="/records" component={protect(Records)} />
        <Route path="/records/new" component={protect(RecordForm)} />
        <Route path="/records/:id/edit" component={protect(RecordForm)} />
        <Route path="/records/:id" component={protect(RecordDetail)} />
        <Route path="/vitals" component={protect(Vitals)} />
        <Route path="/hydration" component={protect(Hydration)} />
        <Route path="/vitals/new" component={protect(VitalsForm)} />
        <Route path="/transfusion" component={protect(Transfusion)} />
        <Route path="/transfusion/new" component={protect(TransfusionForm)} />
        <Route path="/transfusion/:id" component={protect(TransfusionDetail)} />
        <Route path="/transfusion/history" component={protect(TransfusionHistory)} />
        <Route path="/iron-monitoring" component={protect(IronMonitoring)} />
        <Route path="/appointments" component={protect(Appointments)} />
        <Route path="/appointments/new" component={protect(AppointmentForm)} />
        <Route path="/directory" component={protect(Directory)} />
        <Route path="/directory/:id" component={protect(DirectoryDetail)} />
        {/* Emergency is intentionally NOT protected — first-time / unauthenticated
            users tapping "Need urgent care?" must always reach the ambulance
            number and crisis guidance. */}
        <Route path="/emergency" component={Emergency} />
        <Route path="/profile" component={protect(Profile)} />
        <Route path="/profile/edit" component={protect(ProfileEdit)} />
        <Route path="/settings" component={protect(Settings)} />
        <Route path="/settings/contacts" component={protect(Contacts)} />
        <Route path="/notifications" component={protect(Notifications)} />
        <Route path="/settings/notifications" component={protect(NotificationSettings)} />
        <Route path="/settings/ambulance" component={protect(AmbulancePage)} />
        <Route path="/settings/hospital-checklist" component={protect(HospitalChecklist)} />
        <Route path="/genotype-checker" component={GenotypeChecker} />
        <Route path="/family" component={protect(Family)} />
        <Route path="/family/add" component={protect(FamilyAdd)} />
        <Route path="/school-letter" component={protect(SchoolLetter)} />
        <Route path="/resources" component={Resources} />
        <Route path="/resources/:id" component={ResourceDetail} />
        <Route path="/brand" component={Brand} />
        <Route path="/admin" component={protect(Admin)} />
        <Route path="/blog" component={BlogIndex} />
        <Route path="/blog/:slug" component={BlogPost} />
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