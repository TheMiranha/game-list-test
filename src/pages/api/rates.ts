import { ratesController } from '@/modules/api/rates/application'
import { IResponse } from '@/modules/api/rates/domain/_types/route'
import type { NextApiRequest, NextApiResponse } from 'next'

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  return ratesController.handle(req, res)
}
