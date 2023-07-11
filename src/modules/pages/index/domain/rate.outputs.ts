import { IRate } from '@/modules/commom/domain/_types/rate'

export interface IRateOutputs {
  rateGame({
    gameId,
    stars,
    like,
    token
  }: {
    token: string
    gameId: number
    stars: number
    like: boolean
  }): Promise<boolean>
  getRateGames({ token }: { token: string }): Promise<IRate[]>
}
