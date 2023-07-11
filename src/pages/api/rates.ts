import { ratesController } from '@/modules/api/rates/application'
import { IResponse } from '@/modules/api/rates/domain/_types/route'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  return ratesController.handle(req, res)
}
