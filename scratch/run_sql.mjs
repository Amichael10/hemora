import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runSql() {
  const { data, error } = await supabase.rpc('execute_sql', {
    sql: 'ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS category TEXT;'
  });

  if (error) {
    // If rpc fails, it might be because execute_sql doesn't exist
    console.error('Error executing SQL via RPC:', error);
    console.log('Note: execute_sql RPC might not be enabled. You can enable it in Supabase dashboard or skip this if column already exists.');
  } else {
    console.log('SQL executed successfully');
  }
}

runSql();
