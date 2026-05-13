import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

function authOk(request: Request): boolean {
  const expected = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!expected) return true;
  const apikey =
    request.headers.get("apikey") ||
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return apikey === expected;
}

type CrisisRow = {
  user_id: string;
  occurred_at: string;
  triggers: unknown;
  pain_level: string | null;
};

async function aiBlurb(reason: string, fallback: string): Promise<string> {
  const grokKey = process.env.GROK_API_KEY || process.env.XAI_API_KEY;

  if (grokKey) {
    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${grokKey}` },
        body: JSON.stringify({
          model: "grok-2-latest",
          messages: [
            {
              role: "system",
              content:
                "You write short, warm, non-medical reminder messages (max 140 chars) for a sickle cell support app. No diagnosis, no medical advice, no emojis at start.",
            },
            { role: "user", content: `Write a gentle heads-up notification body. Context: ${reason}` },
          ],
        }),
      });
      if (!res.ok) return fallback;
      const json: any = await res.json();
      const text = json?.choices?.[0]?.message?.content?.trim();
      return text && text.length < 200 ? text : fallback;
    } catch {
      return fallback;
    }
  }

  return fallback;
}

export const Route = createFileRoute("/api/public/hooks/predict-crisis")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!authOk(request)) return new Response("Unauthorized", { status: 401 });

        const result = { users_checked: 0, predictions_scheduled: 0, errors: [] as string[] };

        // Tomorrow (UTC) — we want to warn 24h ahead.
        const tomorrow = new Date();
        tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
        const tomorrowDom = tomorrow.getUTCDate();
        const tomorrowISO = tomorrow.toISOString().slice(0, 10);

        // Pull last 6 months of crisis logs across all users.
        const sinceISO = new Date(Date.now() - 1000 * 60 * 60 * 24 * 180).toISOString();

        try {
          const { data: logs, error } = await (supabaseAdmin as any)
            .from("crisis_logs")
            .select("user_id, occurred_at, triggers, pain_level")
            .gte("occurred_at", sinceISO)
            .order("occurred_at", { ascending: false })
            .limit(2000);
          if (error) throw error;

          // Group by user.
          const byUser = new Map<string, CrisisRow[]>();
          for (const row of (logs as CrisisRow[]) ?? []) {
            const arr = byUser.get(row.user_id) ?? [];
            arr.push(row);
            byUser.set(row.user_id, arr);
          }

          for (const [userId, rows] of byUser) {
            result.users_checked++;

            // Pattern: same day-of-month appears in >=2 distinct months.
            const monthsByDom = new Map<number, Set<string>>();
            const triggersByDom = new Map<number, string[]>();
            for (const r of rows) {
              const d = new Date(r.occurred_at);
              const dom = d.getUTCDate();
              const ym = `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
              if (!monthsByDom.has(dom)) monthsByDom.set(dom, new Set());
              monthsByDom.get(dom)!.add(ym);
              const t = Array.isArray(r.triggers) ? (r.triggers as string[]) : [];
              triggersByDom.set(dom, [...(triggersByDom.get(dom) ?? []), ...t]);
            }

            const matchMonths = monthsByDom.get(tomorrowDom);
            if (!matchMonths || matchMonths.size < 2) continue;

            // Skip if we already scheduled a prediction for this user/date.
            const tag = `crisis_prediction-${userId}-${tomorrowISO}`;
            const { data: existing } = await (supabaseAdmin as any)
              .from("scheduled_notifications")
              .select("id")
              .eq("user_id", userId)
              .eq("kind", "crisis_prediction")
              .gte("send_at", new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString())
              .lte("send_at", new Date(Date.now() + 1000 * 60 * 60 * 30).toISOString())
              .limit(1);
            if (existing && existing.length > 0) continue;

            // Respect opt-out (reuse crisis_followups flag).
            const { data: prof } = await (supabaseAdmin as any)
              .from("profiles")
              .select("notify_crisis_followups")
              .eq("user_id", userId)
              .maybeSingle();
            if (prof?.notify_crisis_followups === false) continue;

            const triggers = Array.from(
              new Set((triggersByDom.get(tomorrowDom) ?? []).filter(Boolean))
            ).slice(0, 3);
            const reason = `User has had a crisis on day ${tomorrowDom} of the month in ${matchMonths.size} previous months${
              triggers.length ? `, common triggers: ${triggers.join(", ")}` : ""
            }. Tomorrow is day ${tomorrowDom}.`;
            const fallback = triggers.length
              ? `Heads up — past crises clustered around this date. Watch for ${triggers.join(", ")} and stay hydrated.`
              : "Heads up — past crises clustered around this date. Stay hydrated, rest well, and keep meds on hand.";

            const body = await aiBlurb(reason, fallback);

            // Schedule for ~6am UTC tomorrow (day before the at-risk day in local dawn).
            const sendAt = new Date(tomorrow);
            sendAt.setUTCHours(6, 0, 0, 0);

            const { error: insErr } = await (supabaseAdmin as any)
              .from("scheduled_notifications")
              .insert({
                user_id: userId,
                kind: "crisis_prediction",
                send_at: sendAt.toISOString(),
                title: "A gentle heads-up for tomorrow",
                body,
                url: "/crisis",
                payload: { tag, day_of_month: tomorrowDom, prior_months: matchMonths.size },
              });
            if (insErr) {
              result.errors.push(`schedule ${userId}: ${insErr.message}`);
              continue;
            }
            result.predictions_scheduled++;
          }
        } catch (e: any) {
          result.errors.push(`predict: ${e?.message ?? e}`);
        }

        return new Response(JSON.stringify(result), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});