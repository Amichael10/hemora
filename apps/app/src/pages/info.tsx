import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";

interface Props {
  title: string;
  back?: string;
  children: React.ReactNode;
}

export function InfoPage({ title, back = "/settings", children }: Props) {
  return (
    <MobileAppShell>
      <SubPageHeader title={title} back={back} />
      <article className="px-6 pb-12 prose prose-sm max-w-none text-foreground/90 leading-relaxed [&_h2]:font-serif [&_h2]:text-primary [&_h2]:text-[18px] [&_h2]:font-semibold [&_h2]:tracking-[-0.3px] [&_h2]:mt-6 [&_h2]:mb-2 [&_p]:text-sm [&_p]:text-muted-foreground [&_li]:text-sm [&_li]:text-muted-foreground">
        {children}
      </article>
    </MobileAppShell>
  );
}

export function About() {
  return (
    <InfoPage title="About Kindred">
      <h2>Care, together.</h2>
      <p>
        Kindred is a gentle companion for families managing sickle cell care.
        Track medications, log crisis moments, save records, and find providers — all in one private place.
      </p>
      <h2>Our mission</h2>
      <p>To make day-to-day care feel less heavy, and to make sure no caregiver feels alone.</p>
      <h2>Built with love</h2>
      <p>Made by a small team in collaboration with patients and families.</p>
    </InfoPage>
  );
}

export function Help() {
  return (
    <InfoPage title="Help & support">
      <h2>Common questions</h2>
      <p><strong>How do I add a medication?</strong> Go to Meds → tap the + button → fill in the details.</p>
      <p><strong>How do I log a crisis?</strong> Tap Crisis from the bottom navigation and follow the steps.</p>
      <p><strong>Is my data private?</strong> Yes — your data is tied to your account and only visible to you.</p>
      <h2>Contact us</h2>
      <p>Email <a href="mailto:hello@kindred.app" className="text-primary underline">hello@kindred.app</a> — we usually reply within 24 hours.</p>
    </InfoPage>
  );
}

export function Privacy() {
  return (
    <InfoPage title="Privacy Policy">
      <p>Last updated: May 2026</p>
      <h2>What we collect</h2>
      <p>Account info (email, name) and the health data you choose to log: medications, crisis events, care records, and emergency contacts.</p>
      <h2>How we use it</h2>
      <p>To deliver Kindred features only. We do not sell your data and we do not share it with advertisers.</p>
      <h2>Where it's stored</h2>
      <p>Your data is stored securely on our backend and protected by row-level security so only you can read it.</p>
      <h2>Your rights</h2>
      <p>You can export, edit, or delete your data at any time. Email us to request deletion of your account.</p>
    </InfoPage>
  );
}

export function Terms() {
  return (
    <InfoPage title="Terms of Service">
      <p>Last updated: May 2026</p>
      <h2>Not medical advice</h2>
      <p>Kindred helps you organise care information. It is not a substitute for professional medical advice, diagnosis, or treatment.</p>
      <h2>Account responsibility</h2>
      <p>Keep your sign-in credentials safe. You are responsible for activity on your account.</p>
      <h2>Acceptable use</h2>
      <p>Do not use Kindred to harm others, share illegal content, or attempt to disrupt the service.</p>
      <h2>Changes</h2>
      <p>We may update these terms; we'll notify you of meaningful changes.</p>
    </InfoPage>
  );
}