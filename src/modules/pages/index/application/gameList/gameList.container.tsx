import { IRate } from '@/modules/commom/domain/_types/rate'
import { Dispatch, SetStateAction } from 'react'
import { IGame } from '../../domain/game'
import { GameCardContainer } from '../gameCard/gameCard.container'

export interface IGameListContainerProps {
  games: IGame[]
  rates: IRate[]
  setSelectedGame: (e: IGame) => void
  setRates: Dispatch<SetStateAction<IRate[]>>
}

export const GameListContainer = ({
  games,
  rates,
  setSelectedGame,
  setRates
}: IGameListContainerProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 px-10 mt-5 mb-5 place-items-center xl:w-1/2">
      {games.map(game => (
        <div key={game.title} className="col-span-3 md:col-span-1">
          <GameCardContainer
            rate={rates.find(rate => rate.gameId == game.id) || null}
            game={game}
            setSelectedGame={setSelectedGame}
            setRates={setRates}
          />
        </div>
      ))}
    </div>
  )
}
