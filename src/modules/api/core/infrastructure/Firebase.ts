import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

const credentials = {
  clientEmail: process.env.BFF_CLIENT_EMAIL,
  privateKey: process.env.BFF_PRIVATE_KEY
    ? JSON.parse(process.env.BFF_PRIVATE_KEY).privateKey
    : 'nao encontrada',
  projectId: process.env.BFF_PROJECT_ID
}

if (!getApps().length) {
  initializeApp({
    credential: cert(credentials)
  })
}

const adminDb = getFirestore()

const adminAuth = getAuth()

export { adminDb, adminAuth }
