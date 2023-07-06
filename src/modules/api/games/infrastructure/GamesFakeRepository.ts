import {
  IGamesRepositoryOutput,
  IGetGamesResponse
} from '../domain/games.repository.outputs'
import games from './fake-data/data.json'

export class GamesFakeRepository implements IGamesRepositoryOutput {
  async getGames({ email }: { email: string }): Promise<IGetGamesResponse> {
    return {
      status: 'success',
      games
    }
  }
}
