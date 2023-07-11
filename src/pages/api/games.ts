import { gamesController } from '@/modules/api/games/application'
import { IResponse } from '@/modules/api/games/domain/_types/route'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  return gamesController.handle(req, res)
}
