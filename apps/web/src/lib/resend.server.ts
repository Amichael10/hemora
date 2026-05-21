import { Resend } from 'resend';

// Provide a dummy key if the env var is missing to prevent synchronous crashes on import during SSR
const resend = new Resend(process.env.RESEND_API_KEY || process.env.HEMORA_API_KEY || "re_dummy");

export { resend };

export async function sendEmail({
  to,
  subject,
  html,
  from = "Hemora <hello@notify.hemora.xyz>",
  text,
}: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  text?: string;
}) {
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
    text,
  });

  if (error) {
    console.error('[resend] error:', error);
    throw error;
  }

  return data;
}
