import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { auth } from './Firebase'

export const SignIn = ({
  email,
  password
}: {
  email: string
  password: string
}): Promise<IResponseType> => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      return {
        success: true,
        message: 'ok'
      }
    })
    .catch(error => {
      return {
        success: false,
        message: error.code
      }
    })
}

export const CreateUser = ({
  email,
  password
}: {
  email: string
  password: string
}): Promise<IResponseType> => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      return {
        success: true,
        message: 'ok'
      }
    })
    .catch(error => {
      return {
        success: false,
        message: error.code
      }
    })
}

interface IResponseType {
  success: boolean
  message: string
}
