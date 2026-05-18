import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function checkQueue() {
  const { data, error } = await supabase.rpc('read_email_batch', {
    queue_name: 'auth_emails',
    batch_size: 10,
    vt: 0
  })

  if (error) {
    console.error('Error reading queue:', error)
    return
  }

  console.log(`Found ${data?.length || 0} messages in auth_emails queue`)
  console.log(JSON.stringify(data, null, 2))
}

checkQueue()
