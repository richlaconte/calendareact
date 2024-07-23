import { Dayjs } from 'dayjs'

export type Event = {
  id: string
  start?: Dayjs
  end?: Dayjs
  date?: {
    start?: Dayjs
    end?: Dayjs
  }
  title: string
}

export type Day = {
  day: Dayjs
  inMonth: boolean
}

export type Error = {
  title: string
  message: string
  color: string
}

type Color = {
  background?: string
  border?: string
  text?: string
  dots?: string
}

interface ColorWithHover extends Color {
  hover?: Color
}

export type Colors = {
  primary?: string
  secondary?: string
  defaultEvent?: string
  small?: {
    today?: ColorWithHover
    selected?: ColorWithHover
    unselected?: ColorWithHover
    notInMonth?: ColorWithHover
  }
  week?: {
    today?: Color
    selected?: Color
    unselected?: Color
    notInMonth?: Color
    selectedArea?: string
  }
  month?: {
    today?: Color
    selected?: Color
    unselected?: Color
    notInMonth?: Color
    border?: string
    selectedArea?: string
  }
}
