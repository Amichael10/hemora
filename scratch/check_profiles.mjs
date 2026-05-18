import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: 'apps/app/.env' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkProfiles() {
  console.log('Checking profiles...');
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(5)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching profiles:', error);
  } else {
    console.log('Recent profiles:', JSON.stringify(profiles, null, 2));
  }
}

checkProfiles();
