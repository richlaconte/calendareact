import React, { FC } from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { useCalendar } from '../../../contexts/calendarContext'

const Header: FC<{ weekDays: any }> = ({ weekDays }) => {
  const { errors, dayAction } = useCalendar()

  return (
    <Box display='flex' maxHeight='72px' flexGrow={1} sx={{ overflowY: 'scroll' }}>
      <Box maxWidth='48px' flexGrow={1} />
      {weekDays.map((day: any) => {
        const yearNumber = day.format('YYYY')
        const monthName = day.format('MMMM').toLowerCase()
        const year = errors && yearNumber in errors ? errors[yearNumber] : {}
        const month = year && monthName in year ? year[monthName] : {}
        const dayOfMonth = day.format('D')
        const dayErrors = dayOfMonth in month ? month[dayOfMonth] : []
        const requested = dayErrors.filter((error: { title: string }) => error.title === 'Requested')

        return (
          <Box
            key={day.format('DD-MM-YYYY')}
            width='0'
            flexGrow={1}
            height='100%'
            display='flex'
            alignItems='flex-start'
            justifyContent='flex-start'
            flexDirection='column'
            boxShadow='-1px -1px 0px 0px #E0E0E0 inset'
          >
            <Box px={1} py={0.5} display='flex' justifyContent='space-between' width='100%' height='26px'>
              <Typography
                sx={{ fontSize: '10px', fontWeight: '700', lineHeight: '16px', textTransform: 'uppercase' }}
                color='#71717A'
              >
                {day.format('ddd')}
              </Typography>
              {!!requested.length && (
                <Box display='flex' alignItems='center'>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontWeight: '500',
                      lineHeight: '140%',
                      marginRight: '6px',
                    }}
                  >
                    Requested
                  </Typography>
                  {requested[0]?.icon}
                </Box>
              )}
            </Box>
            <Box pl={1} display='flex' width='100%' justifyContent='space-between'>
              <Typography sx={{ fontSize: '22px', fontWeight: '500', lineHeight: '32px' }}>
                {day.format('DD')}
              </Typography>
              {!!requested.length && requested[0]?.onClick && (
                <Button
                  variant='outlined'
                  sx={{
                    padding: '4px 12px',
                    marginRight: '8px',
                    marginTop: '2px',
                    height: '30px',
                  }}
                  onClick={() => requested[0]?.onClick(day)}
                >
                  Submit
                </Button>
              )}
              {dayAction && dayAction?.onClick && !requested.length && (
                <IconButton
                  color={dayAction.color}
                  onClick={() => dayAction.onClick(day)}
                  size='small'
                  sx={{ marginRight: '8px' }}
                >
                  {dayAction.icon}
                </IconButton>
              )}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default Header
