import { Loading, Text } from '@nextui-org/react'
import { TypeAnimation } from 'react-type-animation'

export const LoaderContainer = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'grid',
        placeItems: 'center'
      }}
      id="loader_container"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <Loading type="gradient" size="xl" color="secondary" />
        <Text
          h1
          size={30}
          css={{
            textGradient: '45deg, $blue600 -20%, $pink600 50%'
          }}
          weight="bold"
        >
          <TypeAnimation
            sequence={['Carregando...', 1000, 'Loading...', 1000]}
            wrapper="span"
            speed={1}
            style={{ display: 'inline-block' }}
            repeat={Infinity}
            cursor
          />
        </Text>
      </div>
    </div>
  )
}
