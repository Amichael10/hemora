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

async function checkState() {
  const { data, error } = await supabase
    .from('email_send_state')
    .select('*')
    .single()

  if (error) {
    console.error('Error fetching state:', error)
    return
  }

  console.log('Email Send State:')
  console.log(JSON.stringify(data, null, 2))
}

checkState()
