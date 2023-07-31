import React, { FC } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { Day } from '../CalendarTypes'
import { useCalendar } from '../../../contexts/calendarContext'

const Day: FC<any> = ({ day, key }) => {
  const { colors, selectedDate, eventsByDay, onSelectDate } = useCalendar()

  const isSelected = day.day.isSame(selectedDate, 'day')

  console.log(selectedDate)

  const monthName = day.day.format('MMMM').toLowerCase()
  const dayNumber = day.day.format('D')

  const events = eventsByDay[monthName]?.[dayNumber] || []

  return (
    <Box key={key} display='flex' flexGrow={1} width='100%' textAlign='center' justifyContent='center'>
      <Box width='35px'>
        <IconButton
          sx={{ width: '100%', height: '100%', backgroundColor: isSelected ? colors.small.selected.background : null }}
          size='small'
          onClick={() => onSelectDate && onSelectDate(day.day)}
        >
          <Box display='flex' flexDirection='column'>
            <Box>
              <Typography
                color={day.inMonth ? colors.small.unselected.text : colors.small.notInMonth.text}
                fontSize='13.2px'
                fontWeight='600'
              >
                {day.day.format('D')}
              </Typography>
            </Box>
            <Box display='flex' height='5px'>
              {day.inMonth && events.length >= 1 && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='6'
                  height='5'
                  viewBox='0 0 6 5'
                  fill='none'
                  style={{ display: 'block' }}
                >
                  <circle
                    cx='2.7429'
                    cy='2.4'
                    r='2.4'
                    fill={isSelected ? colors.small.selected.dots : colors.small.unselected.dots}
                  />
                </svg>
              )}
              {day.inMonth && events.length >= 2 && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='6'
                  height='5'
                  viewBox='0 0 6 5'
                  fill='none'
                  style={{ display: 'block' }}
                >
                  <circle
                    cx='2.7429'
                    cy='2.4'
                    r='2.4'
                    fill={isSelected ? colors.small.selected.dots : colors.small.unselected.dots}
                  />
                </svg>
              )}
              {day.inMonth && events.length >= 3 && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='6'
                  height='5'
                  viewBox='0 0 6 5'
                  fill='none'
                  style={{ display: 'block' }}
                >
                  <circle
                    cx='2.7429'
                    cy='2.4'
                    r='2.4'
                    fill={isSelected ? colors.small.selected.dots : colors.small.unselected.dots}
                  />
                </svg>
              )}
            </Box>
          </Box>
        </IconButton>
      </Box>
    </Box>
  )
}

export default Day
