import { useMemo, useState } from 'react'
import { FormView } from './form.view'
import { FormViewProps } from './_types/form'

export const FormContainer = () => {
  const [alreadyRegistered, setAlreadyRegistered] = useState<boolean>(true)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleLogin = () => {}

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
      setError
    ]
  )

  return <FormView {...formViewProps} />
}
