import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: 'apps/web/.env' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function listAuthTables() {
  const { data, error } = await supabase.rpc('get_auth_tables'); // This might not exist, let's try a raw query
  
  if (error) {
    // Try raw query
    const { data: rawData, error: rawError } = await supabase
      .from('_dummy') // Trigger a query to get error with hints or try postgrest
      .select('*');
    
    // Actually, I'll use the SQL editor approach for them, but let's try to find the right table name
    const { data: tables, error: tablesError } = await supabase
      .rpc('inspect_schema', { schema_name: 'auth' });
      
    console.log('Tables in auth schema:', tables || tablesError);
  }
}

listAuthTables();
