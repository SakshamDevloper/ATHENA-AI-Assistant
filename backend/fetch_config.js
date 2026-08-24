import admin from 'firebase-admin';
import { getProjectManagement } from 'firebase-admin/project-management';
import dotenv from 'dotenv';

dotenv.config();

function parsePrivateKey(raw) {
  if (!raw) return raw
  let key = raw.trim()
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1)
  }
  if (key.includes('\\n')) {
    key = key.replace(/\\n/g, '\n')
  }
  return key
}

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: parsePrivateKey(process.env.FIREBASE_PRIVATE_KEY),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

if (!serviceAccount.project_id || !serviceAccount.private_key || !serviceAccount.client_email) {
  console.error('Missing Firebase credentials. Set FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, and FIREBASE_CLIENT_EMAIL in your .env file.');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function main() {
  try {
    const projectManagement = getProjectManagement();
    const webApps = await projectManagement.listWebApps();
    console.log(`Found ${webApps.length} web apps.`);
    for (const app of webApps) {
      const config = await app.getConfig();
      console.log('--- APP CONFIG ---');
      console.log(JSON.stringify(config, null, 2));
    }
  } catch (error) {
    console.error('Error fetching config:', error);
  }
}

main();
