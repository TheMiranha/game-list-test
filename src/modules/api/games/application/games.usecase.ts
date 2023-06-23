import {
  IGamesRepository,
  IGetGamesResponse
} from '../infrastructure/GamesRepositoy'

export class GamesUseCase {
  constructor(private gamesRepository: IGamesRepository) {}

  async execute({ email }: { email: string }): Promise<IGetGamesResponse> {
    const games = await this.gamesRepository.getGames({ email })
    return games
  }
}
