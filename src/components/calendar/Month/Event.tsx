import React, { FC } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { defaultColors } from '../../../consts'

import { Event } from '../CalendarTypes'

import { useCalendar } from '../../../contexts/calendarContext'

const Event: FC<{ event: Event; color?: string }> = ({ event, color }) => {
  const { onSelectEvent } = useCalendar()

  return (
    <Box width='100%'>
      <Paper
        sx={{ backgroundColor: color || defaultColors.month.background.thisMonth.event, cursor: 'pointer' }}
        className='event'
        onClick={() => onSelectEvent(event)}
      >
        <Box px={1}>
          <Typography sx={{ userSelect: 'none', color: defaultColors.month.text.event }} className='event'>
            {event.title}
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

export default Event