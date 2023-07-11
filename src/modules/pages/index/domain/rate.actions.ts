import { IRateOutputs } from './rate.outputs'

export const rateGame = async ({
  rateOutput,
  gameId,
  like,
  stars,
  token
}: {
  rateOutput: IRateOutputs
  gameId: number
  like: boolean
  stars: number
  token: string
}) => {
  return rateOutput.rateGame({ gameId, like, stars, token })
}

export const getRates = ({
  token,
  rateOutput
}: {
  token: string
  rateOutput: IRateOutputs
}) => {
  return rateOutput.getRateGames({ token })
}
