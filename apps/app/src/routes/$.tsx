import { createFileRoute } from "@tanstack/react-router";
import AppRouter from "@/AppRouter";

export const Route = createFileRoute("/$")({
  component: () => <AppRouter />,
});