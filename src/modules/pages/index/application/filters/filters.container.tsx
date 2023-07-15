import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

export interface IFiltersContainerProps {
  allGenres: string[]
  setSelectedGenre: (e: string) => void
  selectedGenre: string
  open: boolean
  setOpen: (e: boolean) => void
  sortType: 'stars' | 'alphabetical'
  setSortType: (e: 'stars' | 'alphabetical') => void
  onlyLiked: boolean
  setOnlyLiked: (e: boolean) => void
  reverseSort: boolean
  setReverseSort: (e: boolean) => void
}

export const FiltersContainer = ({
  allGenres,
  setSelectedGenre,
  selectedGenre,
  open,
  setOpen,
  sortType,
  setSortType,
  onlyLiked,
  setOnlyLiked,
  reverseSort,
  setReverseSort
}: IFiltersContainerProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-3/4 md:w-auto">
        <DialogHeader>
          <DialogTitle>Opções de busca</DialogTitle>
        </DialogHeader>
        <div className="flex items-center md:justify-center md:items-start flex-col md:flex-row">
          <div className="px-4 flex flex-col items-center">
            <p className="text-xl">Filtros</p>
            <Separator orientation="horizontal" />
            <div className="mt-2 gap-4 flex flex-col">
              <span className="flex items-center gap-2">
                <SelectGenre
                  genres={allGenres}
                  setSelectedGenre={setSelectedGenre}
                  selectedGenre={selectedGenre}
                />
              </span>
              <span className="flex items-center gap-2">
                <Switch
                  checked={onlyLiked}
                  onCheckedChange={() => setOnlyLiked(!onlyLiked)}
                />{' '}
                Apenas favoritos
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="hidden md:block" />
          <div className="px-4 flex flex-col items-center mt-4 md:mt-0">
            <p className="text-xl">Ordenação</p>
            <Separator orientation="horizontal" />
            <div className="mt-2 gap-4 flex flex-col">
              <span className="flex items-center gap-2">
                <SelectSortType
                  selectedSortType={sortType}
                  setSelectedSortType={setSortType}
                />
              </span>
              <span className="flex items-center gap-2">
                <Switch
                  checked={reverseSort}
                  onCheckedChange={() => setReverseSort(!reverseSort)}
                />{' '}
                Ordem reversa
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function SelectSortType({
  selectedSortType,
  setSelectedSortType
}: {
  selectedSortType: 'stars' | 'alphabetical'
  setSelectedSortType: (e: 'stars' | 'alphabetical') => void
}) {
  return (
    <Select onValueChange={setSelectedSortType} value={selectedSortType}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Ordenação" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="alphabetical">Alfabética</SelectItem>
        <SelectItem value="stars">Estrelas</SelectItem>
      </SelectContent>
    </Select>
  )
}

function SelectGenre({
  genres,
  setSelectedGenre,
  selectedGenre
}: {
  genres: string[]
  setSelectedGenre: (e: string) => void
  selectedGenre: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedGenre
            ? genres.find(genre => genre === selectedGenre)
            : 'Escolha um gênero'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Escolha um gênero" />
          <CommandEmpty>Nenhum gênero encontrado...</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-64">
              {genres.map(genre => (
                <CommandItem
                  key={genre}
                  onSelect={() => {
                    setSelectedGenre(genre === selectedGenre ? '' : genre)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedGenre === genre ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {genre}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
