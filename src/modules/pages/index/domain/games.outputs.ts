import { Messages } from '@/modules/api/games/domain/route'
import { IGame } from './game'

export interface IGamesOutput {
  getGames(): Promise<IResponse>
}

export interface IResponse {
  message: Messages
  data?: IGame[]
}
