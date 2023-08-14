import React, { useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Box, Typography } from '@mui/material'

import { useCalendar } from '../../../contexts/calendarContext'

import Header from './Header'
import Day from './Day'

const Week = () => {
  const { onSelectTime, onSelectEvent, selectedDate } = useCalendar()

  const today = dayjs()

  const weekStart = selectedDate ? selectedDate.startOf('week') : today.startOf('week')
  const weekEnd = selectedDate ? selectedDate.endOf('week') : today.endOf('week')

  const weekLength = weekEnd.diff(weekStart, 'day') + 1
  const weekDays = Array(weekLength)
    .fill(0)
    .map((_, i) => {
      return weekStart.add(i, 'day')
    })

  useEffect(() => {
    const scroll = document.getElementById('scroll')
    scroll?.scrollTo(0, scroll?.scrollHeight / 3)
  }, [])

  return (
    <Box display='flex' flexDirection='column' height='100%' width='0px' flexGrow='1' pt={2}>
      <Header weekDays={weekDays} />
      <Box display='flex' height='0' flexGrow={1}>
        <Box height='100%' width='100%' display='flex' flexDirection='column' overflow='auto' id='scroll'>
          <Box display='flex' width='100%'>
            <Box width='48px'>
              {Array(24)
                .fill(0)
                .map((_, i) => {
                  return (
                    <Box
                      key={i}
                      width='100%'
                      height='72px'
                      display='flex'
                      alignItems='flex-start'
                      justifyContent='center'
                    >
                      {i === 0 ? (
                        <></>
                      ) : (
                        <Typography
                          sx={{ marginTop: '-10px', fontSize: '12px', color: '#989FAC', textTransform: 'uppercase' }}
                        >
                          {dayjs().hour(i).format('h a')}
                        </Typography>
                      )}
                    </Box>
                  )
                })}
            </Box>
            <Box flexGrow={1} display='flex' width='0'>
              {weekDays.map((day: Dayjs) => {
                return (
                  <Day
                    key={day.format('DD-MM-YYYY')}
                    day={day}
                    onSelectTime={onSelectTime}
                    onSelectEvent={onSelectEvent}
                  />
                )
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Week
