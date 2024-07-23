import React, { FC } from 'react'
import { Dayjs } from 'dayjs'
import Week from './Week'
import Month from './Month'

import { Colors, Event } from './CalendarTypes'

import CalendarContextProvider from '../../contexts/calendarContext'
import Small from './Small'

type CalendarProps = {
  view?: 'week' | 'month'
  events: Event[]
  onSelectTime?: (start: Dayjs | null, end: Dayjs | null) => unknown
  onSelectEvent?: (event: Event | null | undefined) => unknown
  onSelectDate?: (date: Dayjs) => unknown | void
  selectedDate?: Dayjs
  onEditEvent?: (event: Event) => unknown
  onDeleteEvent?: (event: Event) => unknown
  onApproveEvent?: (event: Event) => unknown
  showApprove?: boolean
  errors?: any
  dayActions?: any
  colors?: Colors
}

const Calendar: FC<CalendarProps> = ({
  view,
  events,
  onSelectTime,
  onSelectEvent,
  selectedDate,
  onSelectDate,
  onEditEvent,
  onDeleteEvent,
  onApproveEvent,
  showApprove,
  errors,
  dayActions,
  colors,
}) => {
  if (view === 'week')
    return (
      <CalendarContextProvider
        view={view}
        events={events}
        onSelectTime={onSelectTime}
        onSelectEvent={onSelectEvent}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
        onEditEvent={onEditEvent}
        onDeleteEvent={onDeleteEvent}
        onApproveEvent={onApproveEvent}
        showApprove={showApprove}
        errors={errors}
        dayActions={dayActions}
        colors={colors}
      >
        <Week />
      </CalendarContextProvider>
    )

  if (view === 'month')
    return (
      <CalendarContextProvider
        view={view}
        events={events}
        onSelectTime={onSelectTime}
        onSelectEvent={onSelectEvent}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
        onEditEvent={onEditEvent}
        onDeleteEvent={onDeleteEvent}
        onApproveEvent={onApproveEvent}
        showApprove={showApprove}
        errors={errors}
        dayActions={dayActions}
        colors={colors}
      >
        <Month />
      </CalendarContextProvider>
    )

  return (
    <CalendarContextProvider
      view={view}
      events={events}
      onSelectTime={onSelectTime}
      onSelectEvent={onSelectEvent}
      selectedDate={selectedDate}
      onSelectDate={onSelectDate}
      onEditEvent={onEditEvent}
      onDeleteEvent={onDeleteEvent}
      onApproveEvent={onApproveEvent}
      showApprove={showApprove}
      errors={errors}
      dayActions={dayActions}
      colors={colors}
    >
      <Small />
    </CalendarContextProvider>
  )
}

export default Calendar
