import { GamesFakeRepository } from '../infrastructure/GamesFakeRepository'
import { GamesMastersRepository } from '../infrastructure/GamesMastersRepository'

export const config = {
  gamesRepository:
    process.env.NODE_ENV != 'test'
      ? new GamesFakeRepository()
      : new GamesMastersRepository()
}
