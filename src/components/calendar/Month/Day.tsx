import React, { FC } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Box, Typography } from '@mui/material'

import { Day as DayType, Event as EventType } from '../CalendarTypes'
import { useCalendar } from '../../../contexts/calendarContext'
import Event from './Event'

const Day: FC<
  DayType & {
    dayInWeekIndex: number
    onMouseDown: (day: Dayjs) => unknown
    onMouseOver: (day: Dayjs) => unknown
    mouseDown: boolean
    start: Dayjs | null
    end: Dayjs | null
  }
> = ({ day, inMonth, dayInWeekIndex, onMouseDown, onMouseOver, start, end }) => {
  const { events, colors } = useCalendar()
  const dayNumber = day.format('DD')

  const today = dayjs()
  const isToday = day.isSame(today, 'day')

  const getColor = () => {
    if (inMonth) {
      if (isBetween) {
        return colors.month.background.thisMonth.selecting
      }
      if (isToday) {
        return colors.month.background.thisMonth.today
      }
      return colors.month.background.thisMonth.static
    }
    return colors.month.background.otherMonth.static
  }

  // check if the day is between start and end
  const isBetween = dayNumber >= (start?.format('DD') || 0) && dayNumber < (end?.format('DD') || 0)

  const todayEvents = events.filter((event: EventType) => {
    const eventStart = dayjs(event.start)
    const eventEnd = dayjs(event.end)
    const start = dayjs(day).startOf('day')
    const end = dayjs(day).add(1, 'day').startOf('day')

    const isBetween: boolean = start.isSameOrBefore(eventStart) && end.isSameOrAfter(eventEnd)

    return isBetween
  })

  return (
    <Box
      display='flex'
      flexGrow='1'
      width='100%'
      justifyContent='center'
      paddingTop='10px'
      sx={{
        backgroundColor: getColor(),
        borderLeft: dayInWeekIndex === 0 ? 'none' : colors.month.border,
      }}
      onMouseDown={(e: any) => {
        console.log(e.target.classList)
        if (!inMonth || e?.target?.classList?.contains('event')) return

        onMouseDown(day)
      }}
      onMouseOver={inMonth ? () => onMouseOver(day) : undefined}
    >
      <Box display='flex' flexDirection='column' width='100%'>
        <Typography sx={{ userSelect: 'none', width: '40px', textAlign: 'center' }}>{day.format('DD')}</Typography>
        {todayEvents?.map((event, i) => (
          <Event key={i} event={event} />
        ))}
      </Box>
    </Box>
  )
}

export default Day
