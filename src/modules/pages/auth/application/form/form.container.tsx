import { useCallback, useMemo, useState } from 'react'
import { FormView } from './form.view'
import { FormViewProps } from './_types/form'
import { useRouter } from 'next/navigation'
import {
  CreateUser,
  SignIn
} from '@/modules/contexts/authentication/infrastructure/FirebaseAuthentication'

export const FormContainer = () => {
  const [alreadyRegistered, setAlreadyRegistered] = useState<boolean>(true)
  const [email, setEmail] = useState<string>('lxbrmiranda@gmail.com')
  const [password, setPassword] = useState<string>('lucas318003')
  const [confirmPassword, setConfirmPassword] = useState<string>('lucas310803')
  const [error, setError] = useState<string>('')

  const { push } = useRouter()

  const handleSignIn = useCallback(async () => {
    const response = await SignIn({ email, password })
    if (response.success) {
      return push('/')
    }
    switch (response.message) {
      case 'auth/user-not-found':
        setError('Usuário não encontrado')
        break
      default:
        setError('Ocorreu um erro inesperado')
    }
  }, [email, password, push])

  const handleCreateUser = useCallback(async () => {
    if (password != confirmPassword) {
      setError('As senhas digitadas são diferentes')
      return
    }
    if (password.length < 8) {
      setError('As senhas precisam ter pelo menos 8 caracteres')
      return
    }
    const response = await CreateUser({ email, password })
    if (response.success) {
      return push('/')
    }
    switch (response.message) {
      case 'auth/email-already-in-use':
        setError('O email já está sendo utilizado')
        break
      default:
        'Ocorreu um erro inesperado'
    }
  }, [email, password, confirmPassword, push])

  const handleLogin = useCallback(() => {
    if (alreadyRegistered) {
      handleSignIn()
    } else {
      handleCreateUser()
    }
  }, [alreadyRegistered, handleSignIn, handleCreateUser])

  const formViewProps = useMemo<FormViewProps>(
    () => ({
      alreadyRegistered,
      setAlreadyRegistered,
      email,
      setEmail,
      password,
      setPassword,
      confirmPassword,
      setConfirmPassword,
      handleLogin,
      error,
      setError
    }),
    [
      alreadyRegistered,
      setAlreadyRegistered,
      email,
      setEmail,
      password,
      setPassword,
      confirmPassword,
      setConfirmPassword,
      error,
      handleLogin,
      setError
    ]
  )

  return <FormView {...formViewProps} />
}
