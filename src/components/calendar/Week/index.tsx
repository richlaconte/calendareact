import React, { FC } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Box, Typography } from '@mui/material'

import { Event } from '../CalendarTypes'

import Day from './Day'

type WeekProps = {
  events: Event[]
  onSelectTime: (start: Dayjs, end: Dayjs) => unknown
  onSelectEvent: (event: Event | undefined) => unknown
}

const Week: FC<WeekProps> = ({ events, onSelectTime, onSelectEvent }) => {
  const today = dayjs()

  const weekStart = today.startOf('week')
  const weekEnd = today.endOf('week')

  const weekLength = weekEnd.diff(weekStart, 'day') + 1
  const weekDays = Array(weekLength)
    .fill(0)
    .map((_, i) => {
      return weekStart.add(i, 'day')
    })

  return (
    <Box display='flex' height='100%' flexGrow='1'>
      <Box width='120px' height='100%' display='flex' flexDirection='column'>
        <Box>
          <Typography>Week</Typography>
          <Typography>Title</Typography>
        </Box>
        {Array(24)
          .fill(0)
          .map((_, i) => {
            return (
              <Box key={i} width='100%' height='100%' display='flex' alignItems='center' justifyContent='center'>
                <Typography>{dayjs().hour(i).format('ha')}</Typography>
              </Box>
            )
          })}
      </Box>
      <Box display='flex' flexGrow='1' height='100%'>
        {weekDays.map((day: Dayjs) => {
          return (
            <Day
              key={day.format('DD-MM-YYYY')}
              day={day}
              onSelectTime={onSelectTime}
              onSelectEvent={onSelectEvent}
              events={events}
            />
          )
        })}
      </Box>
    </Box>
  )
}

export default Week
