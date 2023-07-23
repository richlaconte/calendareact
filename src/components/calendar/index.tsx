import React, { FC } from 'react'
import { Dayjs } from 'dayjs'
import Week from './Week'
import Month from './Month'

import { Event } from './CalendarTypes'

type CalendarProps = {
  view?: 'week' | 'month'
  events: Event[]
  onSelectTime: (start: Dayjs | null, end: Dayjs | null) => unknown
  onSelectEvent: (event: Event | null | undefined) => unknown
}

const Calendar: FC<CalendarProps> = ({ view, events, onSelectTime, onSelectEvent }) => {
  if (view === 'week') return <Week events={events} onSelectTime={onSelectTime} onSelectEvent={onSelectEvent} />

  return <Month events={events} onSelectTime={onSelectTime} onSelectEvent={onSelectEvent} />
}

export default Calendar
