import { NextApiRequest, NextApiResponse } from 'next'
import { RatesUseCase } from './rates.usecase'
import { IResponse } from '../domain/_types/route'

export class RatesController {
  constructor(private ratesUseCase: RatesUseCase) {}

  async handle(req: NextApiRequest, res: NextApiResponse<IResponse>) {
    const { token } = req.body.data

    if (token == null || token == undefined) {
      return res.send({
        message: 'Invalid token',
        success: false
      })
    }

    const response = await this.ratesUseCase.execute({ token })
    res.status(200).send(response)
  }
}
