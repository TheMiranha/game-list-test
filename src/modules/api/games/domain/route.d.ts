import { IGame } from './game'

export interface IResponse {
  status: HttpStatus
  message: Messages
  data?: IGame[]
}

export interface IPayload {
  email: string
}

export type Nullable<T> = T | null | undefined

export type HttpStatus = 200 | 500 | 400 | 408

export type Messages =
  | 'O servidor não conseguirá responder por agora, tente voltar novamente mais tarde'
  | 'O servidor fahou em responder, tente recarregar a página'
  | 'O servidor demorou para responder, tente mais tarde'
  | 'Preencha todos os campos para continuar'
  | 'ok'
