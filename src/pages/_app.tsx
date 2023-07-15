import { Toaster } from '@/components/ui/toaster'
import { AuthenticationContextProvider } from '@/modules/contexts/authentication/application/authentication.context'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthenticationContextProvider>
      <Component {...pageProps} />
      <Toaster />
    </AuthenticationContextProvider>
  )
}
