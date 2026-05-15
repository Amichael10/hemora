import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedBlog() {
  const dataPath = path.join(process.cwd(), 'scratch', 'blog_posts.json');
  const rawData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const posts = rawData.map(post => ({
    title: post['Title (H1, <60 chars ideal)'],
    slug: post['URL Slug'],
    excerpt: post['Excerpt / Lede'],
    body_markdown: post['Article Body (Markdown)'],
    status: 'published',
    published_at: new Date().toISOString(),
  }));

  console.log(`Seeding ${posts.length} blog posts...`);

  const { data, error } = await supabase
    .from('blog_posts')
    .upsert(posts, { onConflict: 'slug' })
    .select();

  if (error) {
    console.error('Error seeding blog posts:', error);
  } else {
    console.log('Successfully seeded blog posts:', data.length);
  }
}

seedBlog();
