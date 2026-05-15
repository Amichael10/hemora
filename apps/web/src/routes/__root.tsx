import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import meltingFace from "@/assets/lottie/1fae0.json";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import posthog from "posthog-js";
import { useEffect } from "react";

function NotFoundComponent() {
  return (
    <div className="min-h-[100dvh] w-full bg-secondary flex justify-center">
      <div className="w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col relative shadow-xl items-center text-center px-6 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center flex-1 justify-center"
        >
          <Lottie animationData={meltingFace} loop className="w-56 h-56" />
          <h1 className="text-[120px] leading-none font-bold text-primary tracking-tight mt-2">
            404
          </h1>
          <h2 className="h-display text-foreground mt-6 max-w-[280px]">
            We couldn't find that page.
          </h2>
          <p className="mt-3 body-md text-muted-foreground max-w-[300px]">
            The link may be broken, or the page may have been moved. Let's get you back on track.
          </p>
        </motion.div>

        <div className="mt-auto w-full flex flex-col gap-3 pt-12">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Hemora | Care that stays with you, between appointments." },
      { name: "description", content: "The sickle cell companion for African families. Track meds, log crises, keep records, and find care that understands the disease." },
      { name: "author", content: "Hemora" },
      { property: "og:title", content: "Hemora | Care that stays with you, between appointments." },
      { property: "og:description", content: "The sickle cell companion for African families. Track meds, log crises, keep records, and find care that understands the disease." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@HemoraApp" },
      { name: "twitter:title", content: "Hemora | Care that stays with you, between appointments." },
      { name: "twitter:description", content: "The sickle cell companion for African families. Track meds, log crises, keep records, and find care that understands the disease." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/eTJbxoiYG4MyJ8qM7G3yamJCQct1/social-images/social-1778187742363-3446cf5a-b364-4074-89e4-84b395eb4ff2.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/eTJbxoiYG4MyJ8qM7G3yamJCQct1/social-images/social-1778187742363-3446cf5a-b364-4074-89e4-84b395eb4ff2.webp" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    // Track pageview on route change
    posthog.capture("$pageview");
  }, [router.state.location.pathname]);

  return (
    <PostHogProvider>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </PostHogProvider>
  );
}
