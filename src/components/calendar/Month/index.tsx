import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Box } from '@mui/material'

import Week from './Week'

import { useCalendar } from '../../../contexts/calendarContext'

const Month = () => {
  const { onSelectTime } = useCalendar()

  const viewOffset = undefined

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
    onSelectTime(start, end)
    setStart(null)
    setEnd(null)
  }

  const onMouseLeave = () => {
    setStart(null)
    setEnd(null)
    setMouseDown(false)
  }

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
