import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
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
import { config } from '../../config/base'
import { IGame } from '../../domain/game'
import { rateGame } from '../../domain/rate.actions'
import { Label } from '@/components/ui/label'

export interface ISelectedGameContainerProps {
  game: IGame | null
  open: boolean
  setOpen: (e: boolean) => void
  rate: IRate | null
  setRates: Dispatch<SetStateAction<IRate[]>>
}

export const SelectedGameContainer = ({
  game,
  open,
  setOpen,
  rate,
  setRates
}: ISelectedGameContainerProps) => {
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
    if (game == null) return
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {game?.title || 'Sem nome'} ({game?.genre || 'Sem gênero'})
          </DialogTitle>
          <Separator orientation="horizontal" />
          <DialogDescription>
            {game?.short_description || 'Sem descrição'}
          </DialogDescription>
        </DialogHeader>
        <div className="text-sm flex flex-col gap-2">
          <p>Desenvolvedor: {game?.developer || 'Sem desenvolvedor'}</p>
          <p>Plataforma: {game?.platform || 'Sem desenvolvedor'}</p>
          <p>Publicadora: {game?.publisher || 'Sem desenvolvedor'}</p>
          <p>Lançamento: {game?.release_date || 'Sem desenvolvedor'}</p>
          <Label
            className="cursor-pointer"
            onClick={() => {
              window.open(game?.game_url || '/')
            }}
          >
            Ver mais
          </Label>
        </div>
        <Separator orientation="horizontal" />
        <DialogFooter>
          <div className="w-full flex gap-4">
            {rate?.like ? (
              <HeartFilledIcon
                className="h-4 w-4 cursor-pointer text-red-500 animate-[hearth_1s_1]"
                onClick={handleLike}
              />
            ) : (
              <HeartIcon
                className="h-4 w-4 cursor-pointer text-slate-500"
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
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
