import { Button, Card, Input, Spacer } from '@nextui-org/react'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { FormViewProps } from './_types/form'
import { FormStyle } from './form.style'

export const FormView = ({
  alreadyRegistered,
  email,
  password,
  confirmPassword,
  error,
  ...props
}: FormViewProps) => {
  const styleAlreadyRegistered = useMemo(
    () => alreadyRegistered || false,
    [alreadyRegistered]
  )
  const styleEmail = useMemo(() => email || '', [email])
  const stylePassword = useMemo(() => password || '', [password])
  const styleError = useMemo(() => error || '', [error])
  const styleConfirmPassword = useMemo(
    () => confirmPassword || '',
    [confirmPassword]
  )

  const styleProps = useMemo<FormViewProps>(
    () => ({
      alreadyRegistered: styleAlreadyRegistered,
      email: styleEmail,
      password: stylePassword,
      confirmPassword: styleConfirmPassword,
      error: styleError,
      ...props
    }),
    []
  )

  return <FormStyle {...styleProps} />
}
