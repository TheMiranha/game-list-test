import { IRate } from '@/modules/commom/domain/_types/rate'

export interface IUserData {
  token: string
  uid: string
  rates: IRate[]
}
