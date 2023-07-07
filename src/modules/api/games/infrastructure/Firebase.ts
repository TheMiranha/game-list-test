import { initializeApp, cert } from 'firebase-admin/app'

const credentials = {
  clientEmail: process.env.BFF_CLIENT_EMAIL,
  privateKey: process.env.BFF_PRIVATE_KEY,
  projectId: process.env.BFF_PROJECT_ID
}

const adminFirebase = initializeApp({
  credential: cert(credentials)
})

export { adminFirebase }
