import { RateController } from './rate.controller'
import { RateUseCase } from './rate.usecase'

const rateUseCase = new RateUseCase()
const rateController = new RateController(rateUseCase)

export { rateController }
