import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function promote(email) {
  console.log(`Promoting user: ${email}`);
  
  // 1. Get user by email
  const { data: { users }, error: getError } = await supabase.auth.admin.listUsers();
  if (getError) throw getError;
  
  const user = users.find(u => u.email === email);
  if (!user) {
    console.error("User not found");
    return;
  }
  
  // 2. Update user to be confirmed
  const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
    email_confirm: true,
  });
  
  if (updateError) throw updateError;
  
  console.log(`Successfully confirmed user ${email}!`);
}

const email = process.argv[2];
if (!email) {
  console.error("Usage: node promote_admin.mjs <email>");
  process.exit(1);
}

promote(email).catch(console.error);
