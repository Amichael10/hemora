import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: 'apps/app/.env' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkLogs() {
  console.log('Checking email_send_log...');
  const { data: logs, error } = await supabase
    .from('email_send_log')
    .select('*')
    .limit(10)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching logs:', error);
  } else {
    console.log('Recent logs:', JSON.stringify(logs, null, 2));
  }
  
  console.log('Checking email_send_state...');
  const { data: state, error: stateError } = await supabase
    .from('email_send_state')
    .select('*')
    .single();
    
  if (stateError) {
    console.error('Error fetching state:', stateError);
  } else {
    console.log('Send state:', JSON.stringify(state, null, 2));
  }
}

checkLogs();
