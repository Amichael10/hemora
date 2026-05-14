import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: 'apps/web/.env' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkTable() {
  const { data, error } = await supabase
    .from('email_send_log')
    .select('*')
    .limit(1);
    
  if (error) {
    console.error('Error checking email_send_log:', error);
  } else {
    console.log('email_send_log exists!');
  }
}

checkTable();
