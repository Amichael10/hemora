import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: 'apps/web/.env' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkCron() {
  const { data, error } = await supabase.rpc('get_cron_jobs'); // If I created this earlier
  
  if (error) {
    // Try raw query to check cron.job and cron.job_run_details
    const { data: jobs, error: jobsError } = await supabase.rpc('check_cron_status');
    console.log('Cron status:', jobs || jobsError);
  } else {
    console.log('Cron jobs:', JSON.stringify(data, null, 2));
  }
}

checkCron();
