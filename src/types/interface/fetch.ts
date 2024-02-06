export interface IFetchState {
  error: string | null
  isLoading: boolean | null
}

export interface IQuery {
  offset: IOffset
}

export interface IOffset {
  count: number
  page: number
}