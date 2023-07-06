import { config } from '../config/base'
import { getGames } from '../domain/games.repository.actions'
import { IGetGamesResponse } from '../domain/games.repository.outputs'

export class GamesUseCase {
  async execute({ email }: { email: string }): Promise<IGetGamesResponse> {
    const games = await getGames({
      email,
      gamesRepositoryOutput: config.gamesRepository
    })
    return games
  }
}
