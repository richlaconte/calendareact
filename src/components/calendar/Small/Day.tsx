import React, { FC } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { Day } from '../CalendarTypes'

const Day: FC<any> = ({ day, key }) => {
  console.log(day)
  return (
    <Box key={key} display='flex' flexGrow={1} width='100%' textAlign='center' justifyContent='center'>
      <Box width='35px'>
        <IconButton sx={{ width: '100%', height: '100%' }} size='small'>
          <Box display='flex' flexDirection='column'>
            <Box>
              <Typography color={day.inMonth ? '#FFFFFF' : '#71717A'} fontSize='13.2px' fontWeight='600'>
                {day.day.format('D')}
              </Typography>
            </Box>
            <Box display='flex' height='5px'>
              {day.inMonth && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='6'
                  height='5'
                  viewBox='0 0 6 5'
                  fill='none'
                  style={{ display: 'block' }}
                >
                  <circle cx='2.7429' cy='2.4' r='2.4' fill='#D6D6D6' />
                </svg>
              )}
              {day.inMonth && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='6'
                  height='5'
                  viewBox='0 0 6 5'
                  fill='none'
                  style={{ display: 'block' }}
                >
                  <circle cx='2.7429' cy='2.4' r='2.4' fill='#D6D6D6' />
                </svg>
              )}
              {day.inMonth && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='6'
                  height='5'
                  viewBox='0 0 6 5'
                  fill='none'
                  style={{ display: 'block' }}
                >
                  <circle cx='2.7429' cy='2.4' r='2.4' fill='#D6D6D6' />
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
