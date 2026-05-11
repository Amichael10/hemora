import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { sendToSubscriptions } from "@/lib/push.server";

// Admin-only broadcast: requires a Bearer token equal to SUPABASE_SERVICE_ROLE_KEY,
// OR a signed-in admin user (has_role check).

const BodySchema = z.object({
  title: z.string().min(1).max(120),
  body: z.string().min(1).max(400),
  url: z.string().max(2048).optional(),
});

async function callerIsAdmin(request: Request): Promise<boolean> {
  // 1) Service role bearer
  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (token && token === process.env.SUPABASE_SERVICE_ROLE_KEY) return true;

  // 2) Signed-in admin user
  if (!token) return false;
  try {
    const { data: userData } = await supabaseAdmin.auth.getUser(token);
    const userId = userData?.user?.id;
    if (!userId) return false;
    const { data: roles } = await (supabaseAdmin as any)
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    return Array.isArray(roles) && roles.some((r: any) => r.role === "admin");
  } catch {
    return false;
  }
}

export const Route = createFileRoute("/api/public/hooks/broadcast-product-update")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!(await callerIsAdmin(request))) return new Response("Unauthorized", { status: 401 });

        let parsed;
        try {
          parsed = BodySchema.parse(await request.json());
        } catch (e: any) {
          return new Response(JSON.stringify({ error: e?.message ?? "Bad request" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Pull all subscriptions whose user has notify_product_updates = true
        const { data: rows, error } = await (supabaseAdmin as any)
          .from("push_subscriptions")
          .select("id, endpoint, p256dh, auth, user_id, profiles!inner(notify_product_updates)")
          .eq("profiles.notify_product_updates", true);

        if (error) {
          // Fallback if join not available — fetch in two steps
          const { data: prof } = await (supabaseAdmin as any)
            .from("profiles")
            .select("user_id")
            .eq("notify_product_updates", true);
          const userIds = (prof as any[])?.map((p) => p.user_id) ?? [];
          if (userIds.length === 0) {
            return new Response(JSON.stringify({ sent: 0, removed: 0, recipients: 0 }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }
          const { data: subs2 } = await (supabaseAdmin as any)
            .from("push_subscriptions")
            .select("id, endpoint, p256dh, auth")
            .in("user_id", userIds);
          const r = await sendToSubscriptions((subs2 as any[]) ?? [], {
            title: parsed.title,
            body: parsed.body,
            url: parsed.url || "/",
            tag: `update-${Date.now()}`,
          });
          return new Response(JSON.stringify({ ...r, recipients: (subs2 as any[])?.length ?? 0 }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        const r = await sendToSubscriptions((rows as any[]) ?? [], {
          title: parsed.title,
          body: parsed.body,
          url: parsed.url || "/",
          tag: `update-${Date.now()}`,
        });
        return new Response(JSON.stringify({ ...r, recipients: (rows as any[])?.length ?? 0 }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});