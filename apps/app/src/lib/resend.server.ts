import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export { resend };

export async function sendEmail({
  to,
  subject,
  html,
  from = "Hemora <hello@hemora.xyz>",
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
