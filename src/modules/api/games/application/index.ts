import { GamesFakeRepository } from '../infrastructure/implementations/GamesFakeRepository'
import { GamesTestRepository } from '../infrastructure/implementations/GamesTestRepository'
import { GamesController } from './games.controller'
import { GamesUseCase } from './games.usecase'

const gamesRepository = new GamesTestRepository()
const fakeGamesRepository = new GamesFakeRepository()
// const gamesUseCase = new GamesUseCase(
//   process.env.NODE_ENV == 'test' ? fakeGamesRepository : gamesRepository
// )

const gamesUseCase = new GamesUseCase(fakeGamesRepository)
const gamesController = new GamesController(gamesUseCase)

export { gamesController }
