import React, { FC } from 'react'
import { Dayjs } from 'dayjs'
import { Box } from '@mui/material'

import Day from './Day'

import { Day as DayType } from '../CalendarTypes'

import { useCalendar } from '../../../contexts/calendarContext'

type WeekProps = {
  week: DayType[]
  weekIndex: number
  onMouseDown: (day: Dayjs) => unknown
  onMouseOver: (day: Dayjs) => unknown
  mouseDown: boolean
  start: Dayjs | null
  end: Dayjs | null
}

const Week: FC<WeekProps> = ({ week, weekIndex, onMouseDown, onMouseOver, mouseDown, start, end }) => {
  const { colors } = useCalendar()

  return (
    <Box
      className='month-week'
      display='flex'
      flexGrow='1'
      height='100%'
      sx={{
        borderTop: weekIndex === 0 ? 'none' : colors?.month?.border,
      }}
    >
      {week.map((day, i) => {
        return (
          <Day
            key={i}
            dayInWeekIndex={i}
            day={day.day}
            inMonth={day.inMonth}
            onMouseDown={onMouseDown}
            onMouseOver={onMouseOver}
            mouseDown={mouseDown}
            start={start}
            end={end}
          />
        )
      })}
    </Box>
  )
}

export default Week
