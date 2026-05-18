import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkLogs() {
  const { data, error } = await supabase
    .from('email_send_log')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)

  if (error) {
    console.error('Error fetching logs:', error)
    return
  }

  console.log('Recent Email Logs:')
  console.table(data.map(log => ({
    id: log.id,
    type: log.template_name,
    recipient: log.recipient_email,
    status: log.status,
    error: log.error_message,
    time: log.created_at
  })))
}

checkLogs()
