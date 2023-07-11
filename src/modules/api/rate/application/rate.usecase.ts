import { IResponse } from '../domain/_types/route'
import { adminAuth, adminDb } from '../../core/infrastructure/Firebase'

export class RateUseCase {
  async execute({
    token,
    gameId,
    stars,
    like
  }: {
    token: string
    gameId: number
    stars: number
    like: boolean
  }): Promise<IResponse> {
    const uid = await adminAuth
      .verifyIdToken(token)
      .then(decodedToken => decodedToken.uid)
      .catch(() => {
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
    const obj = {
      gameId,
      like,
      stars
    }
    if (!doc.exists) {
      const newDoc = {
        rates: [obj]
      }
      await userRef.set(newDoc)
      return {
        success: true,
        message: 'ok'
      }
    } else {
      var data = doc.data()
      if (!data) {
        return {
          message: 'Unexpected error',
          success: false
        }
      }

      if (obj.like == false && obj.stars == 0) {
        data['rates'] = data['rates'].filter(
          (rate: typeof obj) => rate.gameId != obj.gameId
        )
      } else {
        if (
          data['rates'].find((rate: typeof obj) => rate.gameId == obj.gameId) !=
          undefined
        ) {
          data['rates'] = data['rates'].map((rate: typeof obj) =>
            rate.gameId != obj.gameId ? rate : obj
          )
        } else {
          data['rates'].push(obj)
        }
      }
      await userRef.set(data)
    }
    return {
      success: true,
      message: 'ok'
    }
  }
}
