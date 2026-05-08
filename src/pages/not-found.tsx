import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeftBold, HomeSmileBold, MagniferBold } from "solar-icon-set";
import hemoraIcon from "@/assets/brand/Logos/Black Hemora Icon Svg.svg";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-[100dvh] w-full bg-secondary flex justify-center">
      <div className="w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col relative shadow-xl items-center text-center px-6 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <img src={hemoraIcon} alt="Hemora" className="w-16 h-16 mb-8 opacity-90" />

          <div className="relative">
            <h1 className="text-[120px] leading-none font-bold text-primary tracking-tight">
              404
            </h1>
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="absolute -top-2 -right-6 bg-accent text-accent-foreground rounded-full p-2 shadow-lg"
            >
              <MagniferBold size={20} />
            </motion.div>
          </div>

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
