import React, { FC } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useCalendar } from '../../../contexts/calendarContext'

const Header: FC<{ weekDays: any }> = ({ weekDays }) => {
  const { errors } = useCalendar()

  return (
    <Box display='flex' maxHeight='72px' flexGrow={1} sx={{ overflowY: 'scroll' }}>
      <Box maxWidth='48px' flexGrow={1} />
      {weekDays.map((day: any) => {
        const monthName = day.format('MMMM').toLowerCase()
        const month = monthName in errors ? errors[monthName] : {}
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
            <Box px={1} py={0.5} display='flex' justifyContent='space-between' width='100%'>
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
                  <svg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17' fill='none'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M6.55338 2.50226C7.32304 1.16819 9.24846 1.16819 10.0181 2.50226L14.921 11.0006C15.6902 12.3339 14.728 14 13.1886 14H3.38286C1.84355 14 0.881263 12.3339 1.65049 11.0006L6.55338 2.50226ZM8.28589 6C8.56203 6 8.78589 6.22386 8.78589 6.5V9C8.78589 9.27614 8.56203 9.5 8.28589 9.5C8.00975 9.5 7.78589 9.27614 7.78589 9V6.5C7.78589 6.22386 8.00975 6 8.28589 6ZM8.28589 11.5C8.56203 11.5 8.78589 11.2761 8.78589 11C8.78589 10.7239 8.56203 10.5 8.28589 10.5C8.00975 10.5 7.78589 10.7239 7.78589 11C7.78589 11.2761 8.00975 11.5 8.28589 11.5Z'
                      fill='#FF767E'
                    />
                  </svg>
                </Box>
              )}
            </Box>
            <Box pl={1} display='flex' width='100%' justifyContent='space-between'>
              <Typography sx={{ fontSize: '22px', fontWeight: '500', lineHeight: '32px' }}>
                {day.format('DD')}
              </Typography>
              {!!requested.length && (
                <Button
                  variant='outlined'
                  sx={{
                    padding: '4px 12px',
                    marginRight: '8px',
                  }}
                >
                  Submit
                </Button>
              )}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default Header
