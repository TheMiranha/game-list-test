import { IGamesRepository, IGetGamesResponse } from '../GamesRepositoy'
import games from './data.json'

export class GamesFakeRepository implements IGamesRepository {
  async getGames({ email }: { email: string }): Promise<IGetGamesResponse> {
    return {
      status: 'success',
      games
    }
  }
}
