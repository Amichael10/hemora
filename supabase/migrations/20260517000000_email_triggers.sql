-- Create a trigger to hit the email webhook on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user_email()
RETURNS trigger AS $$
DECLARE
  webhook_url text := COALESCE(current_setting('app.settings.webhook_url', true), 'https://hemora.xyz/api/email/webhook');
  webhook_secret text := COALESCE(current_setting('app.settings.email_webhook_secret', true), 'email_webhook_secret_placeholder');
BEGIN
  PERFORM net.http_post(
    url := webhook_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || webhook_secret
    ),
    body := jsonb_build_object(
      'type', 'signup',
      'email', NEW.email,
      'user', row_to_json(NEW),
      'data', jsonb_build_object('action_type', 'signup', 'email', NEW.email)
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_email ON auth.users;
CREATE TRIGGER on_auth_user_created_email
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user_email();

-- Create cron job to process email queues
-- Unschedule first if it exists
SELECT cron.unschedule('process-email-queue');

-- Schedule to run every minute
SELECT cron.schedule(
  'process-email-queue',
  '* * * * *',
  $$
    SELECT net.http_post(
      url := COALESCE(current_setting('app.settings.email_process_url', true), 'https://hemora.xyz/api/email/process'),
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || COALESCE(current_setting('app.settings.service_role_key', true), 'service_role_key_placeholder')
      )
    );
  $$
);
