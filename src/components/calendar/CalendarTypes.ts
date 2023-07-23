import { Dayjs } from 'dayjs'

export type Event = {
  id: string
  start: Dayjs
  end: Dayjs
  title: string
}

export type Day = {
  day: Dayjs
  inMonth: boolean
}
