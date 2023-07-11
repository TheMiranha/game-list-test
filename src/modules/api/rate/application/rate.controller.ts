import { NextApiRequest, NextApiResponse } from 'next'
import { RateUseCase } from './rate.usecase'
import { IResponse } from '../domain/_types/route'

export class RateController {
  constructor(private rateUseCase: RateUseCase) {}

  async handle(req: NextApiRequest, res: NextApiResponse<IResponse>) {
    const { token, stars, like, gameId } = req.body.data
    let emptyValues = []
    if (token == null || token == undefined) {
      emptyValues.push('token')
    }
    if (stars == null || stars == undefined) {
      emptyValues.push('stars')
    }
    if (like == null || like == undefined) {
      emptyValues.push('like')
    }
    if (gameId == null || gameId == undefined) {
      emptyValues.push('gameId')
    }
    if (emptyValues.length > 0) {
      res.status(200).send({
        success: false,
        message:
          'Empty values: ' + emptyValues.reduce((acc, cur) => acc + ', ' + cur)
      })
      return
    }
    const response = await this.rateUseCase.execute({
      token,
      stars,
      like,
      gameId
    })
    res.status(200).send(response)
  }
}
