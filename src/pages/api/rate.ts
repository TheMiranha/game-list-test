import { rateController } from '@/modules/api/rate/application'
import { IResponse } from '@/modules/api/rate/domain/_types/route'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  return rateController.handle(req, res)
}
