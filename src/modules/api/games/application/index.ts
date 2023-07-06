import { GamesController } from './games.controller'
import { GamesUseCase } from './games.usecase'

const gamesUseCase = new GamesUseCase()

const gamesController = new GamesController(gamesUseCase)

export { gamesController }
