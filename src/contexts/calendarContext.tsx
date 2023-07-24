import React, { FC, useContext, Context } from 'react'
import { Dayjs } from 'dayjs'
import { Event, Colors } from '../components/calendar/CalendarTypes'

import { defaultColors } from '../consts'

const Context: any = React.createContext({})

type CalendarContextType = {
  view?: 'week' | 'month'
  colors: Colors
  events: Event[]
  onSelectTime: (start: Dayjs | null, end: Dayjs | null) => unknown
  onSelectEvent: (event: Event | null | undefined) => unknown
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
  const value = {
    colors: colors || defaultColors,
    view,
    events,
    onSelectTime,
    onSelectEvent,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default CalendarContextProvider
export const useCalendar = (): CalendarContextType => useContext(Context)
