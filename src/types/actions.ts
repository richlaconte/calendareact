import { Dayjs } from 'dayjs'
import { BadgePropsColorOverrides } from '@mui/material'
import { OverridableStringUnion } from '@mui/types'

export type DayActions = {
  [key: string]: {
    onClick: (e: React.MouseEvent, day: Dayjs) => void
    icon: JSX.Element
    color:
      | OverridableStringUnion<
          'default' | 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning',
          BadgePropsColorOverrides
        >
      | undefined
  }
}
