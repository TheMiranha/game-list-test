import { Button, Card, Input, Spacer, Text } from '@nextui-org/react'
import { FormEvent, useCallback } from 'react'
import { FormViewProps } from './_types/form'

export const FormStyle = ({
  alreadyRegistered,
  setAlreadyRegistered,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleLogin,
  error
}: FormViewProps) => {
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      handleLogin()
    },
    [handleLogin]
  )

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Card
          css={{
            width: '400px',
            maxWidth: '90vw'
          }}
        >
          <Card.Header
            css={{ flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <Text size={'$lg'}>Autenticação</Text>
            {error.length > 0 ? <Text color="error">{error}</Text> : false}
          </Card.Header>
          <Card.Divider />
          <Card.Body>
            <Input
              label="Email"
              type="email"
              css={{ width: '90%' }}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Spacer y={1} />
            <Input
              placeholder="Senha"
              label="Senha"
              type="password"
              css={{ width: '90%' }}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {!alreadyRegistered ? (
              <>
                <Spacer y={1} />
                <Input
                  placeholder="Confirme sua senha"
                  label="Confirmar senha"
                  type="password"
                  css={{ width: '90%' }}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </>
            ) : (
              false
            )}
          </Card.Body>
          <Card.Divider />
          <Card.Footer
            css={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <Button type="submit" css={{ width: '70%' }}>
              {alreadyRegistered ? 'Entrar' : 'Criar conta'}
            </Button>
            <Button
              light
              onClick={() => setAlreadyRegistered(!alreadyRegistered)}
              type="button"
            >
              {alreadyRegistered ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </form>
  )
}
