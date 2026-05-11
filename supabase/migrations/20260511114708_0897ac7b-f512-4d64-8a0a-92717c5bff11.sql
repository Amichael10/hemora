-- Push subscriptions per device
CREATE TABLE public.push_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  endpoint text NOT NULL UNIQUE,
  p256dh text NOT NULL,
  auth text NOT NULL,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_push_subscriptions_user ON public.push_subscriptions(user_id);

ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own push subs all" ON public.push_subscriptions
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Notification preferences on profiles
ALTER TABLE public.profiles
  ADD COLUMN notify_med_reminders boolean NOT NULL DEFAULT true,
  ADD COLUMN notify_daily_summary boolean NOT NULL DEFAULT false,
  ADD COLUMN notify_crisis_followups boolean NOT NULL DEFAULT true,
  ADD COLUMN notify_product_updates boolean NOT NULL DEFAULT false,
  ADD COLUMN timezone text;

-- Scheduled notifications (used for crisis follow-ups + future one-offs)
CREATE TABLE public.scheduled_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  kind text NOT NULL, -- 'crisis_followup' | 'med_reminder' | 'product_update' | etc.
  send_at timestamptz NOT NULL,
  title text NOT NULL,
  body text NOT NULL,
  url text,
  payload jsonb DEFAULT '{}'::jsonb,
  sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_scheduled_notifications_due ON public.scheduled_notifications(send_at) WHERE sent_at IS NULL;
CREATE INDEX idx_scheduled_notifications_user ON public.scheduled_notifications(user_id);

ALTER TABLE public.scheduled_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own scheduled notifs select" ON public.scheduled_notifications
  FOR SELECT USING (auth.uid() = user_id);

-- service role manages writes (cron + triggers)
CREATE POLICY "service role manages scheduled notifs" ON public.scheduled_notifications
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

-- Trigger: when a crisis is logged, schedule a 24h follow-up
CREATE OR REPLACE FUNCTION public.schedule_crisis_followup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.scheduled_notifications (user_id, kind, send_at, title, body, url, payload)
  VALUES (
    NEW.user_id,
    'crisis_followup',
    NEW.occurred_at + interval '24 hours',
    'How are you feeling today?',
    'It''s been a day since your last crisis. Tap to log how you''re doing.',
    '/crisis',
    jsonb_build_object('crisis_id', NEW.id)
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_crisis_followup
  AFTER INSERT ON public.crisis_logs
  FOR EACH ROW EXECUTE FUNCTION public.schedule_crisis_followup();