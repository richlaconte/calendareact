import React, { FC, useContext, Context } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Event, Day, Colors } from '../components/calendar/CalendarTypes'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.extend(isSameOrBefore)

import { defaultColors } from '../consts'

const Context: any = React.createContext({})

type CalendarContextType = {
  view?: 'week' | 'month' | 'small'
  colors: Colors
  events: Event[]
  eventsByDay: any
  onSelectTime?: (start: Dayjs | null, end: Dayjs | null) => unknown
  onSelectEvent?: (event: Event | null | undefined) => unknown
  onSelectDate?: (date: Dayjs) => unknown
  monthWeeks: Day[][]
  selectedDate?: Dayjs
  onEditEvent?: (event: Event) => unknown
  onDeleteEvent?: (event: Event) => unknown
  onApproveEvent?: (event: Event) => unknown
  showApprove?: boolean
}

type CalendarContextProviderProps = {
  children: any
  colors?: Colors
  view?: 'week' | 'month'
  events: Event[]
  onSelectTime?: (start: Dayjs | null, end: Dayjs | null) => unknown
  onSelectEvent?: (event: Event | null | undefined) => unknown
  onSelectDate?: (date: Dayjs) => unknown
  selectedDate?: Dayjs
  onEditEvent?: (event: Event) => unknown
  onDeleteEvent?: (event: Event) => unknown
  onApproveEvent?: (event: Event) => unknown
  showApprove?: boolean
}

const CalendarContextProvider: FC<CalendarContextProviderProps> = ({
  children,
  colors,
  view,
  events,
  onSelectTime,
  onSelectEvent,
  onSelectDate,
  selectedDate,
  onEditEvent,
  onDeleteEvent,
  onApproveEvent,
  showApprove,
}) => {
  const viewOffset = undefined

  const date = selectedDate || dayjs().add(viewOffset || 0, 'month')

  const monthStart = date.startOf('month')
  const monthEnd = date.endOf('month')

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
            inMonth: day.month() === date.month(),
          }
        })

      return weekDays
    })

  interface EventsByDay {
    [month: string]: {
      [day: number]: Event[]
    }
  }

  const eventsByDay: any = events?.length
    ? events.reduce((acc: EventsByDay, event) => {
        const startDate = dayjs(event?.start)
        const endDate = dayjs(event?.end)

        // Iterate through each day between start and end dates
        let currentDate = startDate

        while (currentDate?.isSameOrBefore(endDate, 'day')) {
          const monthName = currentDate.format('MMMM').toLowerCase()
          const day = currentDate.date()

          // Create the month key if it doesn't exist
          if (!acc[monthName]) {
            acc[monthName] = {}
          }

          // Create the day key if it doesn't exist
          if (!acc[monthName][day]) {
            acc[monthName][day] = []
          }

          // Add the event to the corresponding day array
          acc[monthName][day].push(event)

          // Move to the next day
          currentDate = currentDate.add(1, 'day')
        }

        return acc
      }, {})
    : {}

  const value = {
    colors: colors || defaultColors,
    view,
    events,
    eventsByDay,
    onSelectTime,
    onSelectEvent,
    onSelectDate,
    monthWeeks,
    selectedDate,
    onEditEvent,
    onDeleteEvent,
    onApproveEvent,
    showApprove,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default CalendarContextProvider
export const useCalendar = (): CalendarContextType => useContext(Context)
