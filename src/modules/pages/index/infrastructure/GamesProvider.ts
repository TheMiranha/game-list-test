import { IGamesOutput, IResponse } from '../domain/games.outputs'
import { IResponse as IBackendResponse } from '@/modules/api/games/domain/route'
import axios from 'axios'

export class GamesProvider implements IGamesOutput {
  private api

  constructor() {
    this.api = axios.create({
      baseURL: '/'
    })
  }

  async getGames(): Promise<IResponse> {
    const response = (await this.api
      .get('/api/games', {
        headers: {
          email: 'email@email.com'
        }
      })
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error.response.data
      })) as IBackendResponse

    return {
      message: response.message,
      data: response.data
    }
  }
}
