import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../apps/web/.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const mapping = {
  'acute-chest-syndrome-sickle-cell': 'Acute Chest Syndrome.png',
  'sickle-cell-trait-vs-disease': 'Blog -SC Trait vs SC Disease.png',
  'hydroxyurea-sickle-cell-guide': 'Hydroxyurea for Sickle Cell.png',
  'sickle-cell-gene-therapy-new-treatments': 'Newer Treatments for Sickle Cell.png',
  'sickle-cell-pain-crisis-recognize-respond': 'Sickle Cell Pain Crisis-.png',
  'sickle-cell-children-parents-guide': 'Sickle Cell and Children.png',
  'sickle-cell-mental-health': 'Sickle Cell and Mental Health.png',
  'hydration-sickle-cell-disease': 'Staying Hydrated with Sickle Cell.png',
  'traveling-with-sickle-cell-checklist': 'Traveling With Sickle Cell.png',
  'what-is-sickle-cell-disease': 'What is Sickle Cell Disease.png'
};

async function updateCovers() {
  for (const [slug, filename] of Object.entries(mapping)) {
    const url = `/blog-covers/${encodeURIComponent(filename)}`;
    console.log(`Updating ${slug} with ${url}`);
    
    const { error } = await supabase
      .from('blog_posts')
      .update({ cover_url: url })
      .eq('slug', slug);
      
    if (error) {
      console.error(`Error updating ${slug}:`, error);
    } else {
      console.log(`Successfully updated ${slug}`);
    }
  }
}

updateCovers();
