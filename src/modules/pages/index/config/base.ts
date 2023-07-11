import { GamesProvider } from '../infrastructure/GamesProvider'
import { RateProvider } from '../infrastructure/RateProvider'

export const config = {
  gamesProvider: new GamesProvider(),
  rateProvider: new RateProvider()
}
