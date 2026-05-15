import { createServerFn } from "@tanstack/react-start";

/**
 * Triggers a Welcome email via the hemora.xyz webhook.
 * This is called from the onboarding flow after profile creation.
 */
export const triggerWelcomeEmail = createServerFn({ method: "POST" })
  .inputValidator((d: { email: string }) => d)
  .handler(async ({ data }) => {
    const { email } = data;
    const secret = process.env.EMAIL_WEBHOOK_SECRET;
    const webUrl = process.env.WEB_URL || "https://hemora.xyz";

    if (!secret) {
      console.error("EMAIL_WEBHOOK_SECRET is not set");
      throw new Error("Email configuration error");
    }

    try {
      const res = await fetch(`${webUrl}/api/email/webhook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${secret}`,
        },
        body: JSON.stringify({
          type: "welcome",
          data: {
            email: email,
          },
        }),
      });

      if (!res.ok) {
        const error = await res.text();
        console.error("Failed to trigger welcome email:", error);
        throw new Error(`Failed to trigger welcome email: ${error}`);
      }

      return { success: true };
    } catch (err) {
      console.error("Error calling email webhook:", err);
      throw err;
    }
  });
