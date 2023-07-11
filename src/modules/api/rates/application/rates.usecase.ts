import { IRate } from '@/modules/commom/domain/_types/rate'
import { adminAuth, adminDb } from '../../core/infrastructure/Firebase'
import { IResponse } from '../domain/_types/route'

export class RatesUseCase {
  async execute({ token }: { token: string }): Promise<IResponse> {
    const uid = await adminAuth
      .verifyIdToken(token)
      .then(decodedToken => decodedToken.uid)
      .catch(err => {
        console.log(err)
        return ''
      })
    if (uid.length == 0) {
      return {
        success: false,
        message: 'Invalid token'
      }
    }
    const userRef = adminDb.collection('users').doc(uid)
    const doc = await userRef.get()
    if (doc.exists) {
      const data = doc.data()
      return {
        message: 'ok',
        success: true,
        rates: data as IRate[]
      }
    } else {
      return {
        message: 'ok',
        success: true
      }
    }
  }
}
