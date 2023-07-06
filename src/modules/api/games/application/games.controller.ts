import { NextApiRequest, NextApiResponse } from 'next'
import { GamesUseCase } from './games.usecase'
import { IResponse } from '../domain/_types/route'

export class GamesController {
  constructor(private gameUseCase: GamesUseCase) {}

  possibleErros = [500, 502, 503, 504, 507, 508, 509]

  async handle(req: NextApiRequest, res: NextApiResponse<IResponse>) {
    const email = req.headers.email as string
    const forceError = parseInt(req.headers.forceerror as string) as number
    if (!email) {
      res.status(400).send({
        status: 400,
        message: 'Preencha todos os campos para continuar'
      })
      return
    }
    if (forceError) {
      if (forceError == 408) {
        res.status(408).send({
          status: 408,
          message: 'O servidor demorou para responder, tente mais tarde'
        })
      } else {
        res.status(500).send({
          message: !this.possibleErros.includes(forceError || -1)
            ? 'O servidor não conseguirá responder por agora, tente voltar novamente mais tarde'
            : 'O servidor fahou em responder, tente recarregar a página',
          status: 500
        })
      }
      return
    }
    const useCaseResponse = await this.gameUseCase.execute({ email })
    switch (useCaseResponse.status) {
      case 'internal error':
        res.status(500).send({
          message: !this.possibleErros.includes(useCaseResponse.code || -1)
            ? 'O servidor não conseguirá responder por agora, tente voltar novamente mais tarde'
            : 'O servidor fahou em responder, tente recarregar a página',
          status: 500
        })
        break
      case 'timeout':
        res.status(408).send({
          status: 408,
          message: 'O servidor demorou para responder, tente mais tarde'
        })
        break
      case 'success':
        res.status(200).send({
          status: 200,
          message: 'ok',
          data: useCaseResponse.games
        })
        break
    }
  }
}
