import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { sendPushToUser, sendToSubscriptions, type PushPayload } from "@/lib/push.server";

// Local hour (in user's own timezone) at which daily summary fires.
const DAILY_SUMMARY_LOCAL_HOUR = 20; // 8pm local

// Map a frequency label → list of dose offsets (hours) added to the user's first reminder time.
const FREQ_OFFSETS: Record<string, number[]> = {
  "Once daily": [0],
  "Twice daily": [0, 12],
  "Three times daily": [0, 8, 16],
  "Four times daily": [0, 6, 12, 18],
  "Every morning": [0],
  "Every evening": [0],
  "Every 8 hours": [0, 8, 16],
  "Every 12 hours": [0, 12],
  "Weekly": [0],
  "As needed": [],
  "Other": [0],
};

function doseTimesFor(baseHHMM: string, frequency: string | null | undefined): string[] {
  const offsets = FREQ_OFFSETS[frequency ?? "Once daily"] ?? [0];
  if (offsets.length === 0) return [];
  const [hStr, mStr] = baseHHMM.split(":");
  const baseH = parseInt(hStr, 10);
  const baseM = parseInt(mStr, 10);
  if (Number.isNaN(baseH) || Number.isNaN(baseM)) return [];
  return offsets.map((off) => {
    const h = (baseH + off) % 24;
    return `${String(h).padStart(2, "0")}:${String(baseM).padStart(2, "0")}`;
  });
}

function localPartsInTz(date: Date, timeZone: string): { hh: string; mm: string; dateKey: string } {
  try {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const parts = fmt.formatToParts(date).reduce<Record<string, string>>((acc, p) => {
      if (p.type !== "literal") acc[p.type] = p.value;
      return acc;
    }, {});
    const hh = parts.hour === "24" ? "00" : parts.hour;
    return { hh, mm: parts.minute, dateKey: `${parts.year}-${parts.month}-${parts.day}` };
  } catch {
    const hh = String(date.getUTCHours()).padStart(2, "0");
    const mm = String(date.getUTCMinutes()).padStart(2, "0");
    const dateKey = date.toISOString().slice(0, 10);
    return { hh, mm, dateKey };
  }
}

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

        // Cache profile lookups per user this run.
        const profileCache = new Map<string, any>();
        async function getProfile(userId: string) {
          if (profileCache.has(userId)) return profileCache.get(userId);
          const { data } = await (supabaseAdmin as any)
            .from("profiles")
            .select("notify_med_reminders, notify_daily_summary, notify_crisis_followups, notify_product_updates, timezone")
            .eq("user_id", userId)
            .maybeSingle();
          profileCache.set(userId, data);
          return data;
        }

        // 2) Medication reminders — timezone-aware, multi-dose.
        try {
          const { data: meds } = await (supabaseAdmin as any)
            .from("medications")
            .select("id, user_id, name, dose, dosage, frequency, reminder_time, schedule_time, reminder_enabled, status")
            .eq("reminder_enabled", true)
            .eq("status", "ongoing");

          for (const med of (meds as any[]) ?? []) {
            const rawTime = med.reminder_time || med.schedule_time;
            if (!rawTime) continue;
            const baseHM = String(rawTime).slice(0, 5);
            const times = doseTimesFor(baseHM, med.frequency);
            if (times.length === 0) continue;

            const prof = await getProfile(med.user_id);
            if (prof?.notify_med_reminders === false) continue;
            const tz = prof?.timezone || "UTC";
            const { hh, mm, dateKey } = localPartsInTz(now, tz);
            const target = `${hh}:${mm}`;
            if (!times.includes(target)) continue;

            const dose = med.dose || med.dosage || "";
            const r = await sendPushToUser(med.user_id, {
              title: `Time for your ${med.name}`,
              body: dose ? `Take ${dose} now. Tap to log it.` : "Tap to log this dose.",
              url: `/meds/${med.id}`,
              // Tag includes local date so each scheduled dose is unique per day.
              tag: `med-${med.id}-${dateKey}-${target}`,
              data: { medication_id: med.id },
            });
            result.med_reminders_sent += r.sent;
          }
        } catch (e: any) {
          result.errors.push(`med_reminders: ${e?.message ?? e}`);
        }

        // 3) Daily summary — fires when it is DAILY_SUMMARY_LOCAL_HOUR in the user's own timezone.
        try {
          const { data: optedInProfiles } = await (supabaseAdmin as any)
            .from("profiles")
            .select("user_id, timezone")
            .eq("notify_daily_summary", true);

          for (const p of (optedInProfiles as any[]) ?? []) {
            const tz = p.timezone || "UTC";
            const { hh, mm, dateKey } = localPartsInTz(now, tz);
            if (parseInt(hh, 10) !== DAILY_SUMMARY_LOCAL_HOUR || parseInt(mm, 10) >= 5) continue;
            const userId = p.user_id;
            // Local-day start: midnight of dateKey in the user's TZ — approximate via UTC minus 24h window.
            const since = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
              const { data: logs } = await (supabaseAdmin as any)
                .from("medication_logs")
                .select("status")
                .eq("user_id", userId)
                .gte("taken_at", since);

              const taken = (logs as any[])?.filter((l) => l.status === "taken").length ?? 0;
              const missed = (logs as any[])?.filter((l) => l.status === "missed").length ?? 0;
              const total = (logs as any[])?.length ?? 0;

              if (total === 0) continue; // skip silent days

              const r = await sendPushToUser(userId, {
                title: "Your day in meds",
                body: `${taken} taken${missed ? `, ${missed} missed` : ""} today. Tap for details.`,
                url: "/meds",
                tag: `summary-${userId}-${dateKey}`,
              });
              result.daily_summaries_sent += r.sent;
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