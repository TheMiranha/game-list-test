import { IRate } from '@/modules/commom/domain/_types/rate'
import { useAuthentication } from '@/modules/contexts/authentication/application/authentication.context'
import {
  HeartFilledIcon,
  HeartIcon,
  StarFilledIcon,
  StarIcon
} from '@radix-ui/react-icons'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../../../../../components/ui/card'
import { Separator } from '../../../../../components/ui/separator'
import { config } from '../../config/base'
import { IGame } from '../../domain/game'
import { rateGame } from '../../domain/rate.actions'

export interface IGameCardContainerProps {
  game: IGame
  setSelectedGame: (e: IGame) => void
  rate: IRate | null
  setRates: Dispatch<SetStateAction<IRate[]>>
}

export const GameCardContainer = ({
  game,
  setSelectedGame,
  rate,
  setRates
}: IGameCardContainerProps) => {
  const { userData } = useAuthentication()

  const { push } = useRouter()

  const handleLike = async () => {
    if (userData == null) {
      push('/auth')
      return
    }

    const stars = rate?.stars || 0
    const like = rate ? !rate.like : true
    updateState({ stars, like })
  }

  const handleStars = async (stars: number) => {
    if (userData == null) {
      push('/auth')
      return
    }
    const updatedStars = rate ? (rate.stars == stars ? 0 : stars) : stars
    const like = rate ? rate.like || false : false
    updateState({ like, stars: updatedStars })
  }

  const updateState = ({ like, stars }: { like: boolean; stars: number }) => {
    const token = userData.token
    const gameId = game.id
    rateGame({
      rateOutput: config.rateProvider,
      gameId,
      like,
      stars,
      token
    })
    if (stars == 0 && !like) {
      setRates(prev => prev.filter(rate => rate.gameId != gameId))
    } else {
      setRates(prev => {
        const clone = [...prev].filter(rate => rate.gameId != gameId)
        clone.push({
          gameId,
          like,
          stars
        })
        return clone
      })
    }
  }

  return (
    <Card className="max-w-[500px]">
      <CardHeader>
        <CardTitle
          className="text-sky-600 cursor-pointer"
          onClick={() => setSelectedGame(game)}
        >
          {game.title}
        </CardTitle>
        <CardDescription>{game.genre}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={game.thumbnail} alt={game.title} className="w-full" />
      </CardContent>
      <Separator orientation="horizontal" />
      <CardFooter className="gap-4 mt-6">
        {rate?.like ? (
          <HeartFilledIcon
            className="h-5 w-5 cursor-pointer text-red-500 animate-[hearth_1s_1]"
            onClick={handleLike}
          />
        ) : (
          <HeartIcon
            className="h-5 w-5 cursor-pointer text-slate-500"
            onClick={handleLike}
          />
        )}
        <div className="flex">
          {new Array(4).fill(0).map((_, index) => {
            if (rate) {
              if (rate.stars >= index + 1) {
                return (
                  <StarFilledIcon
                    onClick={() => handleStars(index + 1)}
                    key={`${index}`}
                    className="h-4 w-4 cursor-pointer text-yellow-400"
                  />
                )
              }
            }
            return (
              <StarIcon
                onClick={() => handleStars(index + 1)}
                key={`${index}`}
                className="h-4 w-4 cursor-pointer text-slate-500"
              />
            )
          })}
        </div>
      </CardFooter>
    </Card>
  )
}
