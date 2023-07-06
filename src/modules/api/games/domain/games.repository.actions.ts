import {
  IGamesRepositoryOutput,
  IGetGamesResponse
} from './games.repository.outputs'

export const getGames = async ({
  email,
  gamesRepositoryOutput
}: {
  email: string
  gamesRepositoryOutput: IGamesRepositoryOutput
}): Promise<IGetGamesResponse> => {
  const response = await gamesRepositoryOutput.getGames({ email })
  return response
}
