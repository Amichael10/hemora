import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { sendPushToUser, sendToSubscriptions, type PushPayload } from "@/lib/push.server";

// Configurable: hour (UTC) at which daily summary fires.
// 19:00 UTC ≈ 8pm WAT (Nigeria). Adjust if you add per-user timezones later.
const DAILY_SUMMARY_UTC_HOUR = 19;

function authOk(request: Request): boolean {
  const expected = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!expected) return true; // can't enforce, allow
  const apikey = request.headers.get("apikey") || request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return apikey === expected;
}

export const Route = createFileRoute("/api/public/hooks/process-notifications")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!authOk(request)) return new Response("Unauthorized", { status: 401 });

        const result = {
          scheduled_sent: 0,
          med_reminders_sent: 0,
          daily_summaries_sent: 0,
          errors: [] as string[],
        };

        const now = new Date();

        // 1) Due scheduled notifications (crisis follow-ups, etc.)
        try {
          const { data: due } = await (supabaseAdmin as any)
            .from("scheduled_notifications")
            .select("id, user_id, kind, title, body, url, payload")
            .lte("send_at", now.toISOString())
            .is("sent_at", null)
            .limit(200);

          for (const row of (due as any[]) ?? []) {
            // Respect user opt-out
            const { data: prof } = await (supabaseAdmin as any)
              .from("profiles")
              .select("notify_crisis_followups, notify_product_updates")
              .eq("user_id", row.user_id)
              .maybeSingle();

            const optedIn =
              row.kind === "crisis_followup"
                ? prof?.notify_crisis_followups !== false
                : row.kind === "product_update"
                  ? prof?.notify_product_updates !== false
                  : true;

            if (optedIn) {
              const r = await sendPushToUser(row.user_id, {
                title: row.title,
                body: row.body,
                url: row.url || "/",
                tag: `${row.kind}-${row.id}`,
                data: row.payload ?? {},
              });
              if (r.sent > 0) result.scheduled_sent += r.sent;
            }

            await (supabaseAdmin as any)
              .from("scheduled_notifications")
              .update({ sent_at: now.toISOString() })
              .eq("id", row.id);
          }
        } catch (e: any) {
          result.errors.push(`scheduled: ${e?.message ?? e}`);
        }

        // 2) Medication reminders — match dose times within the current minute window.
        try {
          // For v1 we treat schedule_time as UTC. (Per-user timezone is a follow-up.)
          const hh = now.getUTCHours();
          const mm = now.getUTCMinutes();
          const target = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;

          const { data: meds } = await (supabaseAdmin as any)
            .from("medications")
            .select("id, user_id, name, dose, dosage, reminder_time, schedule_time, reminder_enabled, status")
            .eq("reminder_enabled", true)
            .eq("status", "ongoing");

          for (const med of (meds as any[]) ?? []) {
            const rawTime = med.reminder_time || med.schedule_time;
            if (!rawTime) continue;
            const medHM = String(rawTime).slice(0, 5);
            if (medHM !== target) continue;

            const { data: prof } = await (supabaseAdmin as any)
              .from("profiles")
              .select("notify_med_reminders")
              .eq("user_id", med.user_id)
              .maybeSingle();
            if (prof?.notify_med_reminders === false) continue;

            const dose = med.dose || med.dosage || "";
            const r = await sendPushToUser(med.user_id, {
              title: `Time for your ${med.name}`,
              body: dose ? `Take ${dose} now. Tap to log it.` : "Tap to log this dose.",
              url: `/meds/${med.id}`,
              tag: `med-${med.id}-${target}`,
              data: { medication_id: med.id },
            });
            result.med_reminders_sent += r.sent;
          }
        } catch (e: any) {
          result.errors.push(`med_reminders: ${e?.message ?? e}`);
        }

        // 3) Daily summary — only fire on the configured UTC hour, in the first minute window.
        try {
          if (now.getUTCHours() === DAILY_SUMMARY_UTC_HOUR && now.getUTCMinutes() < 5) {
            const { data: optedInProfiles } = await (supabaseAdmin as any)
              .from("profiles")
              .select("user_id")
              .eq("notify_daily_summary", true);

            const todayStart = new Date(now);
            todayStart.setUTCHours(0, 0, 0, 0);

            for (const p of (optedInProfiles as any[]) ?? []) {
              const userId = p.user_id;
              const { data: logs } = await (supabaseAdmin as any)
                .from("medication_logs")
                .select("status")
                .eq("user_id", userId)
                .gte("taken_at", todayStart.toISOString());

              const taken = (logs as any[])?.filter((l) => l.status === "taken").length ?? 0;
              const missed = (logs as any[])?.filter((l) => l.status === "missed").length ?? 0;
              const total = (logs as any[])?.length ?? 0;

              if (total === 0) continue; // skip silent days

              const r = await sendPushToUser(userId, {
                title: "Your day in meds",
                body: `${taken} taken${missed ? `, ${missed} missed` : ""} today. Tap for details.`,
                url: "/meds",
                tag: `summary-${todayStart.toISOString().slice(0, 10)}`,
              });
              result.daily_summaries_sent += r.sent;
            }
          }
        } catch (e: any) {
          result.errors.push(`daily_summary: ${e?.message ?? e}`);
        }

        return new Response(JSON.stringify(result), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});