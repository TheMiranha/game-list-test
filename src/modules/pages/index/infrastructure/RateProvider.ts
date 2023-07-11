import axios from 'axios'
import { IResponse } from '../domain/games.outputs'
import { IRateOutputs } from '../domain/rate.outputs'
import { Nullable } from '@/modules/commom/domain/_types/nullable'
import { IRate } from '@/modules/commom/domain/_types/rate'

export class RateProvider implements IRateOutputs {
  private api

  constructor() {
    this.api = axios.create({
      baseURL: '/'
    })
  }

  async rateGame({
    token,
    gameId,
    like,
    stars
  }: {
    token: string
    gameId: number
    like: boolean
    stars: number
  }): Promise<boolean> {
    const response = await this.api.post('/api/rate', {
      data: {
        gameId,
        like,
        stars,
        token
      }
    })
    return true
  }

  async getRateGames({ token }: { token: string }): Promise<IRate[]> {
    const response = await this.api
      .post('/api/rates', {
        data: {
          token
        }
      })
      .then(axiosResponse => {
        if (axiosResponse.data.success) {
          return axiosResponse.data.rates.rates
        }
        return []
      })
      .catch(_ => [])
    return response
  }
}
