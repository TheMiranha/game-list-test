import { Messages } from '@/modules/api/games/domain/_types/route'
import { IGame } from './game'

export interface IGamesOutput {
  getGames(): Promise<IResponse>
}

export interface IResponse {
  message: Messages
  data?: IGame[]
}
