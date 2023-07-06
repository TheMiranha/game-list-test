import axios from 'axios'
import {
  IGamesRepositoryOutput,
  IGetGamesResponse
} from '../domain/games.repository.outputs'

export class GamesMastersRepository implements IGamesRepositoryOutput {
  private api

  constructor() {
    this.api = axios.create({
      baseURL: 'https://games-test-api-81e9fb0d564a.herokuapp.com'
    })
  }

  async getGames({ email }: { email: string }): Promise<IGetGamesResponse> {
    const data = (await this.api
      .get('/api/data', {
        headers: {
          'dev-email-address': email
        },
        timeout: 5000
      })
      .then(response => {
        return {
          status: 'success',
          games: response.data
        }
      })
      .catch(error => {
        return {
          status: error.code === 'ECONNABORTED' ? 'timeout' : 'internal error',
          code: error.code
        }
      })) as IGetGamesResponse

    return data
  }
}
