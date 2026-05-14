import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: 'apps/web/.env' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkCron() {
  const { data, error } = await supabase.from('cron.job').select('*'); // This might fail if no access
  console.log('Cron jobs:', data || error);
}

checkCron();
