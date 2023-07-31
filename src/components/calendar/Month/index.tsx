import React from 'react'
import { Dayjs } from 'dayjs'
import { Box } from '@mui/material'

import Week from './Week'

import { useCalendar } from '../../../contexts/calendarContext'

const Month = () => {
  const { onSelectTime, monthWeeks } = useCalendar()
  const [mouseDown, setMouseDown] = React.useState(false)

  const [start, setStart] = React.useState<Dayjs | null>(null)
  const [end, setEnd] = React.useState<Dayjs | null>(null)

  const onMouseDown = (day: Dayjs) => {
    setMouseDown(true)
    setStart(day)
    setEnd(day.add(1, 'day'))
  }

  const onMouseOver = (day: Dayjs) => {
    mouseDown && setEnd(day.add(1, 'day'))
  }

  const onMouseUp = () => {
    if (start === null && end === null) return
    setMouseDown(false)
    onSelectTime && onSelectTime(start, end)
    setStart(null)
    setEnd(null)
  }

  const onMouseLeave = () => {
    setStart(null)
    setEnd(null)
    setMouseDown(false)
  }

  return (
    <Box
      display='flex'
      height='100%'
      flexGrow='1'
      flexDirection='column'
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      sx={{
        cursor: mouseDown ? 'move' : 'default',
      }}
    >
      {monthWeeks.map((week, i) => {
        return (
          <Week
            key={i}
            weekIndex={i}
            week={week}
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

export default Month
