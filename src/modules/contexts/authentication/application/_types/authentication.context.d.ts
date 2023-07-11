import { Nullable } from '@/modules/api/games/domain/_types/route'
import { IUserData } from './user'

export interface IAuthenticationContextProps {
  loading: boolean
  userData: Nullable<IUserData>
}
