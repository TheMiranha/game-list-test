import { IRate } from '@/modules/commom/domain/_types/rate'
import { useAuthentication } from '@/modules/contexts/authentication/application/authentication.context'
import { HeartIcon } from '@radix-ui/react-icons'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '../../../../../components/ui/command'
import { IGame } from '../../domain/game'
import { ScrollArea } from '@/components/ui/scroll-area'

export interface IQuickSearchProps {
  games: IGame[]
  setSelectedGame: (e: IGame) => void
  rates: IRate[]
  openQuickSearch: boolean
  setOpenQuickSearch: Dispatch<SetStateAction<boolean>>
}

export const QuickSearchContainer = ({
  games,
  setSelectedGame,
  rates,
  setOpenQuickSearch,
  openQuickSearch
}: IQuickSearchProps) => {
  const { userData } = useAuthentication()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && e.ctrlKey) || (e.key === 'k' && e.metaKey)) {
        e.preventDefault()
        setOpenQuickSearch(true)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <CommandDialog open={openQuickSearch} onOpenChange={setOpenQuickSearch}>
      <CommandInput placeholder="Digite um jogo para uma pesquisa rápida" />
      <CommandList className="overflow-y-hidden">
        <ScrollArea className="h-[300px]">
          <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
          {userData ? (
            <CommandGroup
              heading={
                <span className="flex items-center">
                  <HeartIcon className="w-4 h-4 mr-2" color="red" /> Favoritos
                </span>
              }
            >
              {games
                .filter(game => rates.find(rate => rate.gameId == game.id))
                .map(game => (
                  <CommandItem
                    key={game.title}
                    onSelect={() => {
                      setOpenQuickSearch(false)
                      setSelectedGame(game)
                    }}
                    className="cursor-pointer"
                  >
                    <span>{game.title}</span>
                  </CommandItem>
                ))}
            </CommandGroup>
          ) : (
            false
          )}
          <CommandGroup heading="Sugestões">
            {games
              .filter(
                game => rates.find(rate => rate.gameId == game.id) == undefined
              )
              .map(game => (
                <CommandItem
                  key={game.title}
                  onSelect={() => {
                    setOpenQuickSearch(false)
                    setSelectedGame(game)
                  }}
                  className="cursor-pointer"
                >
                  <span>{game.title}</span>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )
}
