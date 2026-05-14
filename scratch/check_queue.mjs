import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: 'apps/web/.env' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkQueue() {
  // Check auth_emails queue
  const { data: messages, error: readError } = await supabase.rpc('read_email_batch', {
    queue_name: 'auth_emails',
    batch_size: 10,
    vt: 30
  });

  if (readError) {
    console.error('Error reading queue:', readError);
    return;
  }

  console.log(`Queue 'auth_emails' has ${messages?.length || 0} messages pending.`);
  if (messages?.length > 0) {
    console.log('Sample message ID:', messages[0].msg_id);
  }
}

checkQueue();
