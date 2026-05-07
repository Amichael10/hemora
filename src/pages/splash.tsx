import { useLocation } from "wouter";
import kindredLogo from "@assets/Logo_1778055009007.png";
import illustration from "@/assets/images/african-family-illustration.png";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Splash() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-[100dvh] w-full bg-secondary flex justify-center">
      <div className="w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col relative shadow-xl items-center text-center px-6 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <img src={kindredLogo} alt="Kindred Logo" className="w-24 h-24 mb-6" data-testid="img-splash-logo" />
          <h1 className="h-display text-primary max-w-[280px]">
            For every family touched by sickle cell.
          </h1>
          <p className="mt-4 body-md tracking-wide">
            Built for families. Guided by care.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-12 mb-auto"
        >
          <img src={illustration} alt="Family" className="w-[280px] max-w-full" data-testid="img-splash-illustration" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="w-full mt-8"
        >
          <Button size="xl" className="w-full" onClick={() => setLocation("/onboarding")} data-testid="button-get-started">
            Get Started
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
