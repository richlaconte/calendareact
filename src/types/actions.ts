import { Dayjs } from 'dayjs'

export type DayAction = {
  onClick: (e: React.MouseEvent, day: Dayjs) => void
  icon: JSX.Element
  color: 'primary' | 'secondary'
}
