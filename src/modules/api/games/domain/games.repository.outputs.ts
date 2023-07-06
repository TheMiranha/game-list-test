import { IGame } from './_types/game'

export interface IGamesRepositoryOutput {
  getGames({ email }: { email: string }): Promise<IGetGamesResponse>
}

export interface IGetGamesResponse {
  games?: IGame[]
  status: Status
  code?: number
}

export type Status = 'success' | 'timeout' | 'internal error'
