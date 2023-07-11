import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { IAuthenticationContextProps } from './_types/authentication.context'
import { Nullable } from '@/modules/commom/domain/_types/nullable'
import { IUserData } from './_types/user'
import { auth } from '../infrastructure/Firebase'
import { onAuthStateChanged } from 'firebase/auth'

const initialValue: IAuthenticationContextProps = {
  loading: true,
  userData: null
}

const AuthenticationContext =
  createContext<IAuthenticationContextProps>(initialValue)

export const AuthenticationContextProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [loading, setLoading] = useState<boolean>(initialValue.loading)
  const [userData, setUserData] = useState<Nullable<IUserData>>(
    initialValue.userData
  )

  const contextValue = useMemo<IAuthenticationContextProps>(
    () => ({
      loading,
      userData
    }),
    [loading, userData]
  )

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const { uid } = user
        const accessToken = (user as any).accessToken
        setUserData({
          rates: [],
          token: accessToken,
          uid
        })
      }
      setLoading(false)
    })
  }, [])

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export const useAuthentication = (): IAuthenticationContextProps => {
  const context = useContext(AuthenticationContext)

  if (!context) {
    throw new Error(
      'useAuthentication should be inside an AuthenticationContextProvider'
    )
  }
  return context
}
