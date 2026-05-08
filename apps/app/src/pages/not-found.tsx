import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import { ArrowLeftBold, HomeSmileBold } from "solar-icon-set";
import meltingFace from "@/assets/lottie/1fae0.json";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-[100dvh] w-full bg-secondary flex justify-center">
      <div className="w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col relative shadow-xl items-center text-center px-6 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center flex-1 justify-center"
        >
          <Lottie
            animationData={meltingFace}
            loop
            className="w-56 h-56"
          />
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

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-auto w-full flex flex-col gap-3 pt-12"
        >
          <Button
            size="lg"
            className="w-full gap-2"
            onClick={() => setLocation("/dashboard")}
          >
            <HomeSmileBold size={20} />
            Go to dashboard
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="w-full gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeftBold size={18} />
            Go back
          </Button>

          <div className="mt-4 text-xs text-muted-foreground">
            Need help?{" "}
            <Link href="/help" className="text-primary underline underline-offset-2">
              Visit support
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
