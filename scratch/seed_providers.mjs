import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

function loadEnv(envPath) {
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      env[key] = value;
    }
  });
  return env;
}

const env = loadEnv('c:/Users/User/Monorepo/hemora/.env');
const supabaseUrl = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  const providersData = JSON.parse(fs.readFileSync('c:/Users/User/Monorepo/hemora/scratch/providers_seed.json', 'utf8'));
  
  const { data: existingProviders } = await supabase.from('providers').select('id, name');
  const existingMap = new Map(existingProviders?.map(p => [p.name, p.id]) || []);
  
  const toInsert = [];
  const toUpdate = [];
  
  for (const p of providersData) {
    if (existingMap.has(p.name)) {
      toUpdate.push({ id: existingMap.get(p.name), ...p });
    } else {
      toInsert.push(p);
    }
  }
  
  if (toUpdate.length > 0) {
    console.log(`Updating ${toUpdate.length} existing providers...`);
    // Supabase doesn't have a bulk update by ID easily without a unique constraint/upsert logic
    // but we can loop or use a trick. Since it's only 32, we loop.
    for (const p of toUpdate) {
        await supabase.from('providers').update(p).eq('id', p.id);
    }
  }
  
  if (toInsert.length > 0) {
    console.log(`Inserting ${toInsert.length} new providers...`);
    const { error } = await supabase.from('providers').insert(toInsert);
    if (error) console.error('Insert error:', error);
  }
  
  console.log('Successfully synced providers.');
}

seed();
