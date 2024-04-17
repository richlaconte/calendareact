import { Dayjs } from 'dayjs'

export type ErrorObject = {
  title: string
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
