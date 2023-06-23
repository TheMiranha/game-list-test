import { Button, Text } from '@nextui-org/react'

export const ServerErrorContainer = ({ error }: { error: string }) => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      <Text color="error" size={20}>
        {error}
      </Text>
      <Button flat color="error" onClick={() => window.location.reload()}>
        Tentar novamente...
      </Button>
    </div>
  )
}
