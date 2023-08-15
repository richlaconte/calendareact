import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

import { Event as EventType } from '../CalendarTypes'
import { useCalendar } from '../../../contexts/calendarContext'

import Event from './Event'

type DayProps = {
  day: Dayjs
  onSelectTime?: (start: Dayjs, end: Dayjs) => unknown
  onSelectEvent?: (event: EventType | undefined) => unknown
}

const Day: FC<DayProps> = ({ day, onSelectTime, onSelectEvent }) => {
  const { eventsByDay, selectedDate, errors } = useCalendar()
  const [mouseDown, setMouseDown] = React.useState(false)

  const [start, setStart] = React.useState<{ day: null | Dayjs; hour: number }>({
    day: null,
    hour: 0,
  })
  const [end, setEnd] = React.useState<{ day: null | Dayjs; hour: number }>({
    day: null,
    hour: 0,
  })

  const dayOfWeek = day.format('ddd')

  const isToday = day.isSame(dayjs(), 'day')
  const isSelectedDate = selectedDate?.isSame(day, 'day')

  const onMouseUp = () => {
    if (start.day === null && end.day === null) return
    setMouseDown(false)
    const newStart = dayjs(start.day)
      .hour(Math.floor(start.hour / 2))
      .minute((start.hour % 2) * 30)
    const newEnd = dayjs(end.day)
      .hour(Math.floor(end.hour / 2))
      .minute((end.hour % 2) * 30)
    onSelectTime && onSelectTime(newStart, newEnd)
    setStart({ day: null, hour: 0 })
    setEnd({ day: null, hour: 0 })
  }

  const onMouseLeave = () => {
    if (start?.day === null && end?.day === null) return
    setStart({ day: null, hour: 0 })
    setEnd({ day: null, hour: 0 })
    setMouseDown(false)
  }

  const startTimeDisplay = {
    hour: (function () {
      const hour = Math.floor(start.hour / 2)
      if (hour === 0) return 12
      if (hour > 12) return hour - 12
      return hour
    })(),
    minute: start.hour % 2 === 0 ? '00' : '30',
    ampm: start.hour / 2 < 12 ? 'AM' : 'PM',
  }

  const endTimeDisplay = {
    hour: (function () {
      const hour = Math.floor(end.hour / 2)
      if (hour > 12) return hour - 12
      return hour
    })(),
    minute: end.hour % 2 === 0 ? '00' : '30',
    ampm: end.hour / 2 < 12 || end.hour === 48 ? 'AM' : 'PM',
  }

  const monthName = day.format('MMMM').toLowerCase()
  const month = monthName in eventsByDay ? eventsByDay[monthName] : {}
  const dayOfMonth = day.format('D')

  const events = dayOfMonth in month ? month[dayOfMonth] : []

  return (
    <Box
      display='flex'
      flexGrow='1'
      width='0'
      maxWidth='500px'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
    >
      <Box
        display='flex'
        flexGrow='1'
        flexDirection='column'
        width='100%'
        sx={{
          backgroundColor: day.format('YYYY-MM-DD') === dayjs().format('YYY') ? 'lightblue' : 'none',
        }}
      >
        {Array(48)
          .fill(0)
          .map((_, i) => {
            let isStart = false
            let isEnd = false

            // see if there is an event that overlaps this half hour
            const event: EventType | undefined = events.find((event: EventType) => {
              const eventStart = dayjs(event.start)
              const eventEnd = dayjs(event.end)
              const slotStart =
                i % 2 !== 0
                  ? dayjs(day)
                      .hour(Math.floor(i / 2))
                      ?.add(30, 'minute')
                  : dayjs(day).hour(Math.floor(i / 2))
              const slotEnd = dayjs(slotStart).add(30, 'minute')

              const isBetween: boolean =
                slotStart.isSameOrAfter(eventStart) && slotStart.isBefore(eventEnd) && slotEnd.isSameOrBefore(eventEnd)

              isStart = slotStart.isSame(eventStart, 'hour') && slotStart.isSame(eventStart, 'minute')
              isEnd = slotEnd.isSame(eventEnd, 'hour') && slotEnd.isSame(eventEnd, 'minute')

              return isBetween || isStart || isEnd
            })

            return (
              <Box
                key={i}
                height='100%'
                display='flex'
                alignItems='center'
                justifyContent='center'
                borderBottom='none'
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onMouseDown={(e: any) => {
                  if (event) return
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                  const isEvent = e?.target?.classList?.contains('event')
                  const isEventTitle = !isEvent && e?.target?.classList?.contains('eventTitle')
                  if (isEvent || isEventTitle) return onSelectEvent && onSelectEvent(event)
                  setMouseDown(true)
                  setStart({ day, hour: i })
                  setEnd({ day, hour: i + 1 })
                }}
                onMouseOver={() => mouseDown && setEnd({ day, hour: i + 1 })}
                sx={{
                  backgroundColor:
                    start.hour === i && start?.day !== null && start?.day.format('ddd') === dayOfWeek
                      ? '#D6D6D6'
                      : mouseDown &&
                        start.day !== null &&
                        start?.day.format('ddd') === dayOfWeek &&
                        start.hour <= i &&
                        end.day !== null &&
                        end?.day.format('ddd') === dayOfWeek &&
                        end.hour > i
                      ? '#D6D6D6'
                      : isToday
                      ? '#eaf6ff'
                      : isSelectedDate
                      ? '#F0F1F2'
                      : 'white',
                  boxShadow: '-1px -1px 0px 0px #D6D6D6 inset;',
                  cursor: mouseDown ? 'move' : 'default',
                }}
              >
                {start.day !== null && i === start.hour && (
                  <>
                    <Typography sx={{ userSelect: 'none' }} variant='caption'>
                      {startTimeDisplay.hour}:{startTimeDisplay.minute} {startTimeDisplay.ampm}
                    </Typography>
                    <Typography sx={{ userSelect: 'none' }} variant='caption'>
                      -
                    </Typography>
                    <Typography sx={{ userSelect: 'none' }} variant='caption'>
                      {endTimeDisplay.hour}:{endTimeDisplay.minute} {endTimeDisplay.ampm}
                    </Typography>
                  </>
                )}
                {event && <Event event={event} isStart={isStart} isEnd={isEnd} i={i} />}
              </Box>
            )
          })}
      </Box>
    </Box>
  )
}

export default Day
