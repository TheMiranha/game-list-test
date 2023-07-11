import { IRate } from '@/modules/commom/domain/_types/rate'

export interface IResponse {
  success: boolean
  message: string
  rates?: IRate[]
}
