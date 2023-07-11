import { RatesController } from './rates.controller'
import { RatesUseCase } from './rates.usecase'

const ratesUseCase = new RatesUseCase()
const ratesController = new RatesController(ratesUseCase)

export { ratesController }
