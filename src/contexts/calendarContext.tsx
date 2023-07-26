import React, { FC, useContext, Context } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Event, Day, Colors } from '../components/calendar/CalendarTypes'

import { defaultColors } from '../consts'

const Context: any = React.createContext({})

type CalendarContextType = {
  view?: 'week' | 'month' | 'small'
  colors: Colors
  events: Event[]
  onSelectTime: (start: Dayjs | null, end: Dayjs | null) => unknown
  onSelectEvent: (event: Event | null | undefined) => unknown
  monthWeeks: Day[][]
}

type CalendarContextProviderProps = {
  children: any
  colors?: Colors
  view?: 'week' | 'month'
  events: Event[]
  onSelectTime: (start: Dayjs | null, end: Dayjs | null) => unknown
  onSelectEvent: (event: Event | null | undefined) => unknown
}

const CalendarContextProvider: FC<CalendarContextProviderProps> = ({
  children,
  colors,
  view,
  events,
  onSelectTime,
  onSelectEvent,
}) => {
  const viewOffset = undefined

  const today = dayjs().add(viewOffset || 0, 'month')

  const monthStart = today.startOf('month')
  const monthEnd = today.endOf('month')

  const startOffset = monthStart.day()
  const endOffset = 7 - monthEnd.day()

  const monthDisplayLength = monthEnd.diff(monthStart, 'day') + startOffset + endOffset

  const monthWeeks = Array(Math.ceil(monthDisplayLength / 7))
    .fill(0)
    .map((_, i) => {
      const weekStart = monthStart.add(i * 7 - startOffset, 'day')
      const weekEnd = weekStart.add(6, 'day')

      const weekLength = weekEnd.diff(weekStart, 'day') + 1
      const weekDays = Array(weekLength)
        .fill(0)
        .map((_, i) => {
          const day = weekStart.add(i, 'day')
          return {
            day,
            inMonth: day.month() === today.month(),
          }
        })

      return weekDays
    })

  const value = {
    colors: colors || defaultColors,
    view,
    events,
    onSelectTime,
    onSelectEvent,
    monthWeeks,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default CalendarContextProvider
export const useCalendar = (): CalendarContextType => useContext(Context)
