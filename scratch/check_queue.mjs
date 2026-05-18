import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: 'apps/app/.env' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkQueue() {
  console.log('Checking auth_emails queue...');
  const { data: messages, error } = await supabase.rpc('read_email_batch', {
    queue_name: 'auth_emails',
    batch_size: 10,
    vt: 5, // short visibility timeout for checking
  });
  
  if (error) {
    console.error('Error reading queue:', error);
  } else {
    console.log('Queue messages (first 10):', JSON.stringify(messages, null, 2));
    if (messages?.length === 0) {
      console.log('Queue is empty.');
    }
  }
}

checkQueue();
