import { Dispatch, SetStateAction } from 'react'

export interface FormViewProps {
  alreadyRegistered: boolean
  setAlreadyRegistered: Dispatch<SetStateAction<boolean>>
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  password: string
  setPassword: Dispatch<SetStateAction<string>>
  confirmPassword: string
  setConfirmPassword: Dispatch<SetStateAction<string>>
  handleLogin: () => void
  error: string
  setError: Dispatch<SetStateAction<string>>
}
