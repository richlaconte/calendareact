import React, { FC } from 'react'
import { Badge, Box, IconButton, IconButtonProps, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { Day } from '../CalendarTypes'
import { useCalendar } from '../../../contexts/calendarContext'

interface StyledIconButtonProps extends IconButtonProps {
  isSelected?: boolean
  colors: any
}

const StyledIconButton = styled(IconButton)<StyledIconButtonProps>(({ isSelected, colors }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: isSelected ? colors.small.selected.background : colors.small.unselected.background || null,
  '&:hover': {
    backgroundColor: isSelected
      ? colors.small.selected.hover.background
      : colors.small.unselected.hover.background || null,
  },
}))

const Day: FC<any> = ({ day, key }) => {
  const { colors, selectedDate, eventsByDay, onSelectDate, errors } = useCalendar()

  const isSelected = day.day.isSame(selectedDate, 'day')
  const isToday = day.day.isSame(new Date(), 'day')

  const monthName = day.day.format('MMMM').toLowerCase()
  const monthNumber = day.day.month()
  const dayNumber = day.day.format('D')

  const yearNumber = day.day.format('YYYY')
  const year = errors && yearNumber in errors ? errors[yearNumber] : {}
  const month = year && monthNumber in year ? year[monthNumber] : {}
  const dayOfMonth = day.day.format('D')
  const dayErrors = dayOfMonth in month ? month[dayOfMonth] : []
  const dayError = dayErrors.length ? dayErrors[0] : null

  const events = eventsByDay[monthName]?.[dayNumber] || []

  return (
    <Box key={key} display='flex' flexGrow={1} width='100%' textAlign='center' justifyContent='center'>
      <Box sx={{ aspectRatio: '1' }} width='100%'>
        <StyledIconButton
          size='small'
          onClick={() => onSelectDate && onSelectDate(day.day)}
          isSelected={isSelected}
          colors={colors}
          sx={{
            border: isToday ? colors?.small?.today?.border || '1px solid #575D67' : null,
          }}
        >
          <Box display='flex' flexDirection='column' justifyContent='center'>
            <Box>
              <Badge
                color={dayError?.errorColor ? dayError.errorColor : 'error'}
                variant='dot'
                badgeContent={dayError ? null : 0}
              >
                <Typography
                  color={
                    day.inMonth
                      ? isSelected
                        ? colors?.small?.selected?.text
                        : colors?.small?.unselected?.text
                      : colors?.small?.notInMonth?.text
                  }
                  fontSize='13.2px'
                  fontWeight='600'
                >
                  {day.day.format('D')}
                </Typography>
              </Badge>
            </Box>
            <Box display='flex' height='5px' justifyContent='center'>
              {day.inMonth && events.length >= 1 && (
                <svg xmlns='http://www.w3.org/2000/svg' width='6' height='5' viewBox='0 0 6 5' fill='none'>
                  <circle
                    cx='2.7429'
                    cy='2.4'
                    r='2.4'
                    fill={events[0]?.project?.colors?.border || 'rgb(214, 214, 214)'}
                  />
                </svg>
              )}
              {day.inMonth && events.length >= 2 && (
                <svg xmlns='http://www.w3.org/2000/svg' width='6' height='5' viewBox='0 0 6 5' fill='none'>
                  <circle
                    cx='2.7429'
                    cy='2.4'
                    r='2.4'
                    fill={events[1]?.project?.colors?.border || 'rgb(214, 214, 214)'}
                  />
                </svg>
              )}
              {day.inMonth && events.length >= 3 && (
                <svg xmlns='http://www.w3.org/2000/svg' width='6' height='5' viewBox='0 0 6 5' fill='none'>
                  <circle
                    cx='2.7429'
                    cy='2.4'
                    r='2.4'
                    fill={events[2]?.project?.colors?.border || 'rgb(214, 214, 214)'}
                  />
                </svg>
              )}
            </Box>
          </Box>
        </StyledIconButton>
      </Box>
    </Box>
  )
}

export default Day
