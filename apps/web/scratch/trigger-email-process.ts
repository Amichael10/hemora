import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!serviceKey) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

async function triggerProcess() {
  console.log('Triggering email processing...')
  const response = await fetch('http://localhost:5175/api/email/process', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${serviceKey}`
    }
  })

  const data = await response.json()
  console.log('Response:', data)
}

triggerProcess()
