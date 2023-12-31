import { Nullable } from '@/modules/commom/domain/_types/nullable'

export interface IGame {
  id: number
  title: string
  thumbnail: string
  short_description: string
  game_url: string
  genre: string
  platform: string
  publisher: string
  developer: string
  release_date: string
  freetogame_profile_url: Nullable<string>
}
