import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config({ path: 'apps/app/.env' });

const WEBHOOK_URL = 'http://localhost:5178/api/email/webhook';
const SECRET = process.env.EMAIL_WEBHOOK_SECRET;

async function testWebhook() {
  console.log('Testing webhook...');
  const payload = {
    type: 'signup',
    email: 'test@example.com',
    data: {
      action_type: 'signup',
      email: 'test@example.com',
      token_hash: 'test_hash',
      redirect_to: 'https://hemora.xyz/auth/callback'
    },
    user: {
      email: 'test@example.com'
    }
  };

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SECRET}`
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json();
  console.log('Response:', response.status, result);
}

testWebhook();
