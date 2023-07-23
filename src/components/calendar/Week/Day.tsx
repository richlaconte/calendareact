import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

import { Event } from '../CalendarTypes'

type DayProps = {
  day: Dayjs
  onSelectTime: (start: Dayjs, end: Dayjs) => unknown
  onSelectEvent: (event: Event | undefined) => unknown
  events: Event[]
}

const Day: FC<DayProps> = ({ day, events, onSelectTime, onSelectEvent }) => {
  const [mouseDown, setMouseDown] = React.useState(false)

  const [start, setStart] = React.useState<{ day: null | Dayjs; hour: number }>({ day: null, hour: 0 })
  const [end, setEnd] = React.useState<{ day: null | Dayjs; hour: number }>({
    day: null,
    hour: 0,
  })

  const dayOfWeek = day.format('ddd')
  const dayOfWeekNumber = day.day()

  const isToday = day.isSame(dayjs(), 'day')

  const onMouseUp = () => {
    if (start.day === null && end.day === null) return
    setMouseDown(false)
    console.log(start, end)
    const newStart = dayjs(start.day).hour(start.hour)
    const newEnd = dayjs(end.day).hour(end.hour)
    onSelectTime(newStart, newEnd)
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
      if (start.hour === 0) return 12
      if (start.hour > 12) return start.hour - 12
      return start.hour
    })(),
    ampm: start.hour < 12 ? 'AM' : 'PM',
  }

  const endTimeDisplay = {
    hour: end.hour > 12 ? end.hour - 12 : end.hour,
    ampm: end.hour < 12 || end.hour === 24 ? 'AM' : 'PM',
  }

  return (
    <Box
      display='flex'
      flexGrow='1'
      width='0'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
    >
      <Box>
        <Box>
          <Typography sx={{ userSelect: 'none' }}>{dayOfWeek}</Typography>
        </Box>
        <Box>
          <Typography sx={{ userSelect: 'none' }}>{day.format('MMMM DD')}</Typography>
        </Box>
      </Box>
      <Box
        display='flex'
        flexGrow='1'
        flexDirection='column'
        width='100%'
        sx={{
          backgroundColor: day.format('YYYY-MM-DD') === dayjs().format('YYY') ? 'lightblue' : 'none',
        }}
      >
        {Array(24)
          .fill(0)
          .map((_, i) => {
            let isStart = false
            let isEnd = false

            // see if there is an event that overlaps this hour
            const event: Event | undefined = events.find((event: Event) => {
              const eventStart = dayjs(event.start)
              const eventEnd = dayjs(event.end)
              const start = dayjs(day).hour(i)
              const end = dayjs(day).hour(i + 1)

              const isBetween: boolean =
                start.isSameOrAfter(eventStart) && start.isBefore(eventEnd) && end.isSameOrBefore(eventEnd)

              isStart = start.isSame(eventStart)
              isEnd = end.isSame(eventEnd)

              return isBetween || isStart || isEnd
            })

            return (
              <Box
                key={i}
                height='100%'
                display='flex'
                alignItems='center'
                justifyContent='center'
                border='1px solid black'
                borderBottom={i === 23 ? '1px solid black' : 'none'}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onMouseDown={(e: any) => {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                  const isEvent = e?.target?.classList?.contains('event')
                  if (isEvent) return onSelectEvent(event)
                  setMouseDown(true)
                  setStart({ day, hour: i })
                  setEnd({ day, hour: i + 1 })
                }}
                onMouseOver={() => mouseDown && setEnd({ day, hour: i + 1 })}
                sx={{
                  backgroundColor:
                    start.hour === i && start?.day !== null && start?.day.format('ddd') === dayOfWeek
                      ? 'lightgrey'
                      : mouseDown &&
                        start.day !== null &&
                        start?.day.format('ddd') === dayOfWeek &&
                        start.hour <= i &&
                        end.day !== null &&
                        end?.day.format('ddd') === dayOfWeek &&
                        end.hour > i
                      ? 'lightgrey'
                      : isToday
                      ? '#eaf6ff'
                      : 'white',
                  width: dayOfWeekNumber === 6 ? 'calc(100% - 1px)' : '100%',
                  minWidth: '145px',
                  borderLeft: dayOfWeekNumber === 0 ? 'none' : '1px solid black',
                  borderRight: dayOfWeekNumber === 6 ? 'none' : '1px solid black',
                  cursor: mouseDown ? 'move' : 'default',
                }}
              >
                {start.day !== null && i === start.hour && (
                  <>
                    <Typography sx={{ userSelect: 'none' }} variant='caption'>
                      {startTimeDisplay.hour}:00 {startTimeDisplay.ampm}
                    </Typography>
                    <Typography sx={{ userSelect: 'none' }} variant='caption'>
                      -
                    </Typography>
                    <Typography sx={{ userSelect: 'none' }} variant='caption'>
                      {endTimeDisplay.hour}:00 {endTimeDisplay.ampm}
                    </Typography>
                  </>
                )}
                {event && (
                  <div
                    className='event'
                    style={{
                      marginTop: isStart ? '10px' : '0px',
                      marginBottom: isEnd ? '10px' : '0px',
                      zIndex: 1,
                      marginLeft: '10px',
                      marginRight: '10px',
                      backgroundColor: '#3498DB',
                      height: 'calc(100% + 1px)',
                      width: '100%',
                      borderTopRightRadius: isStart ? '5px' : '0px',
                      borderTopLeftRadius: isStart ? '5px' : '0px',
                      borderBottomRightRadius: isEnd ? '5px' : '0px',
                      borderBottomLeftRadius: isEnd ? '5px' : '0px',
                      cursor: 'pointer',
                    }}
                  >
                    {isStart && (
                      <Box maxWidth='100%' position='relative'>
                        <Typography
                          sx={{
                            userSelect: 'none',
                            width: '100%',
                            position: 'absolute',
                            left: '0',
                            right: '0',
                          }}
                          variant='caption'
                        >
                          {event.title}
                        </Typography>
                      </Box>
                    )}
                  </div>
                )}
              </Box>
            )
          })}
      </Box>
    </Box>
  )
}

export default Day
