import { Dayjs } from 'dayjs'
import { BadgePropsColorOverrides } from '@mui/material'
import { OverridableStringUnion } from '@mui/types'

export type ErrorObject = {
  id: string
  errorColor?:
    | OverridableStringUnion<
        'default' | 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning',
        BadgePropsColorOverrides
      >
    | undefined
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
