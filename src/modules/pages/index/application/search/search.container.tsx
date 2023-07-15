import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Badge } from '../../../../../components/ui/badge'
import { Input } from '../../../../../components/ui/input'
import { Button } from '@/components/ui/button'
import { Dispatch, SetStateAction } from 'react'

export interface ISearchContainerProps {
  setOpenFilters: (e: boolean) => void
  setSearch: (e: string) => void
  search: string
  setOpenQuickSearch: Dispatch<SetStateAction<boolean>>
}

export const SearchContainer = ({
  setOpenFilters,
  setSearch,
  search,
  setOpenQuickSearch
}: ISearchContainerProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <span className="flex">
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Pesquise aqui"
          className="w-80"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                onClick={() => setOpenQuickSearch(true)}
              >
                {isMacintosh() ? '⌘K' : 'CtrlK'}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ctrl+K para pesquisa rápida</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>
      <span
        onClick={() => setOpenFilters(true)}
        className="mt-2 text-sm cursor-pointer"
      >
        Opções de busca
      </span>
    </div>
  )
}

function isMacintosh() {
  return navigator.platform.indexOf('Mac') > -1
}
