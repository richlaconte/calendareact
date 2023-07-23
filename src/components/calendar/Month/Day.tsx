import React, { FC } from 'react'
import { Dayjs } from 'dayjs'
import { Box, Typography } from '@mui/material'

import { Day as DayType } from '../CalendarTypes'

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
  const dayNumber = day.format('DD')

  // check if the day is between start and end
  const isBetween = dayNumber >= (start?.format('DD') || 0) && dayNumber < (end?.format('DD') || 0)

  return (
    <Box
      display='flex'
      flexGrow='1'
      justifyContent='center'
      paddingTop='10px'
      sx={{
        backgroundColor: inMonth ? (isBetween ? 'red' : '') : 'grey',
        borderLeft: dayInWeekIndex === 0 ? 'none' : '1px solid black',
      }}
      onMouseDown={inMonth ? () => onMouseDown(day) : undefined}
      onMouseOver={inMonth ? () => onMouseOver(day) : undefined}
    >
      <Typography sx={{ userSelect: 'none', width: '40px', textAlign: 'center' }}>{day.format('DD')}</Typography>
    </Box>
  )
}

export default Day
