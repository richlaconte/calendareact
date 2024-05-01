import { Dayjs } from 'dayjs'

export type ErrorObject = {
  id: string
  title?: string
  onClick: (day: Dayjs) => void
  icon: JSX.Element
}

export type ErrorList = {
  [key: string]: {
    [key: string]: {
      [key: string]: ErrorObject[]
    }
  }
}
