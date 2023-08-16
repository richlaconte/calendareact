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

const isOverlapping = (aStart: any, aEnd: any, bStart: any, bEnd: any) => {
  return (
    (aStart.isSameOrAfter(bStart) && aStart.isBefore(bEnd)) ||
    (aEnd.isAfter(bStart) && aEnd.isSameOrBefore(bEnd)) ||
    (aStart.isSameOrBefore(bStart) && aEnd.isSameOrAfter(bEnd))
  )
}

const findAllOverlappingEvents = (initialStart: dayjs.Dayjs, initialEnd: dayjs.Dayjs, allEvents: any) => {
  const overlappingEvents: any[] = []
  let toCheck = [{ start: initialStart, end: initialEnd }]

  while (toCheck.length > 0) {
    const newToCheck = []

    for (const slot of toCheck) {
      for (const event of allEvents) {
        const eventStart = dayjs(event.start)
        const eventEnd = dayjs(event.end)

        if (
          isOverlapping(slot.start, slot.end, eventStart, eventEnd) &&
          !overlappingEvents.some((e) => e.id === event.id)
        ) {
          overlappingEvents.push(event)
          newToCheck.push(event)
        }
      }
    }

    toCheck = newToCheck
  }

  return overlappingEvents
}

const Day: FC<DayProps> = ({ day, onSelectTime }) => {
  const { eventsByDay, selectedDate } = useCalendar()
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

            const newEvents: any = []

            const slotStart =
              i % 2 !== 0
                ? dayjs(day)
                    .hour(Math.floor(i / 2))
                    ?.add(30, 'minute')
                : dayjs(day).hour(Math.floor(i / 2))

            const slotEnd = dayjs(slotStart).add(30, 'minute')

            const allOverlappingEvents = findAllOverlappingEvents(slotStart, slotEnd, events)

            // see if there is an event that overlaps this half hour
            allOverlappingEvents.forEach((event: EventType) => {
              const eventStart = dayjs(event.start)
              const eventEnd = dayjs(event.end)

              const isBetween: boolean =
                slotStart.isSameOrAfter(eventStart) && slotStart.isBefore(eventEnd) && slotEnd.isSameOrBefore(eventEnd)

              isStart = slotStart.isSame(eventStart, 'hour') && slotStart.isSame(eventStart, 'minute')
              isEnd = slotEnd.isSame(eventEnd, 'hour') && slotEnd.isSame(eventEnd, 'minute')

              // if isBetwee/isStart/isEnd is true, then this event is in this slot
              if (isBetween || isStart || isEnd)
                newEvents.push({
                  ...event,
                  isStart: isStart,
                  isEnd: isEnd,
                  isBetween: isBetween,
                  isSecond:
                    slotStart.isSameOrAfter(eventStart.add(30, 'minute')) &&
                    slotStart.isBefore(eventStart.add(1, 'hour')),
                })
              else {
                newEvents.push({ id: event.id })
              }
            })

            newEvents.sort((a: any, b: any) => (a.id > b.id ? 1 : -1))

            return (
              <Box
                key={i}
                className='emptySlot'
                height='100%'
                width='100%'
                display='flex'
                gap={0.5}
                alignItems='center'
                justifyContent='center'
                borderBottom='none'
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onMouseDown={(e: any) => {
                  // if (newEvents.length) return
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                  if (e?.target?.classList?.contains('emptySlot')) {
                    setMouseDown(true)
                    setStart({ day, hour: i })
                    setEnd({ day, hour: i + 1 })
                  }
                }}
                onMouseOver={() => {
                  if (!mouseDown) return
                  if (i >= start.hour) return setEnd({ day, hour: i + 1 })
                }}
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
                {!newEvents.length && start.day !== null && i === start.hour && (
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
                {newEvents.map((event: any) => {
                  if (!event?.title) return <Box flexGrow={1} borderLeft='5px solid' />
                  // eslint-disable-next-line react/jsx-key
                  return <Event event={event} i={i} />
                })}
              </Box>
            )
          })}
      </Box>
    </Box>
  )
}

export default Day
