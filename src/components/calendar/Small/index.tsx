import React from 'react'
import { Box, Typography } from '@mui/material'
import { useCalendar } from '../../../contexts/calendarContext'

import Day from './Day'

const Small = () => {
  const { monthWeeks } = useCalendar()

  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  return (
    <Box width='100%'>
      <Box display='flex' mb={1}>
        {days.map((day, i) => (
          <Box key={i} display='flex' flexGrow={1} width='100%' textAlign='center' justifyContent='center'>
            <Box width='36.8px'>
              <Typography color='#71717A' fontSize='12px' fontWeight='600' lineHeight='19.2px'>
                {day}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box display='flex' flexDirection='column' gap='6px'>
        {monthWeeks.map((week, i) => (
          <Box key={i} display='flex' gap='6px'>
            {week.map((day, i) => (
              <Day day={day} key={i} />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Small
