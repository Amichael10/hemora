import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config({ path: 'apps/web/.env' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

async function processQueue() {
  console.log('Starting manual queue processing...');
  
  const { data: messages, error: readError } = await supabase.rpc('read_email_batch', {
    queue_name: 'auth_emails',
    batch_size: 5,
    vt: 30
  });

  if (readError) {
    console.error('Error reading queue:', readError);
    return;
  }

  if (!messages || messages.length === 0) {
    console.log('No messages in queue.');
    return;
  }

  console.log(`Processing ${messages.length} messages...`);

  for (const msg of messages) {
    const payload = msg.message;
    console.log(`Sending to ${payload.to} (Subject: ${payload.subject})...`);
    
    try {
      const { data, error } = await resend.emails.send({
        from: payload.from || 'Hemora <hello@hemora.xyz>',
        to: [payload.to],
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      });

      if (error) throw error;

      console.log(`Successfully sent email! Resend ID: ${data.id}`);

      // Update log
      await supabase.from('email_send_log').insert({
        message_id: payload.message_id,
        template_name: payload.label || 'auth_emails',
        recipient_email: payload.to,
        status: 'sent',
      });

      // Delete from queue
      await supabase.rpc('delete_email', {
        queue_name: 'auth_emails',
        message_id: msg.msg_id
      });
      
      console.log(`Deleted message ${msg.msg_id} from queue.`);
    } catch (err) {
      console.error('Failed to send email:', err);
    }
  }
}

processQueue();
