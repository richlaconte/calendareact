import { Dayjs } from 'dayjs'

export type DayAction = {
  onClick: (day: Dayjs) => void
  icon: JSX.Element
  color: 'primary' | 'secondary'
}
