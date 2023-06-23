import { IGamesOutput, IResponse } from './games.outputs'

export const getGames = ({
  gamesOutput
}: {
  gamesOutput: IGamesOutput
}): Promise<IResponse> => {
  return gamesOutput.getGames()
}
