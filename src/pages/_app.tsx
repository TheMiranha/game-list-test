import { AuthenticationContextProvider } from '@/modules/contexts/authentication/application/authentication.context'
import { NextUIProvider, createTheme } from '@nextui-org/react'
import type { AppProps } from 'next/app'

const darkTheme = createTheme({
  type: 'dark'
})

const lightTheme = createTheme({
  type: 'light'
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={lightTheme}>
      <AuthenticationContextProvider>
        <Component {...pageProps} />
      </AuthenticationContextProvider>
    </NextUIProvider>
  )
}
