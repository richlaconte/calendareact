import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'

const Header: FC<{ weekDays: any }> = ({ weekDays }) => (
  <Box display='flex' maxHeight='72px' flexGrow={1}>
    <Box maxWidth='48px' flexGrow={1} />
    {weekDays.map((day: any) => (
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
        <Box px={1} py={0.5}>
          <Typography
            sx={{ fontSize: '10px', fontWeight: '700', lineHeight: '16px', textTransform: 'uppercase' }}
            color='#71717A'
          >
            {day.format('ddd')}
          </Typography>
        </Box>
        <Box pl={1}>
          <Typography sx={{ fontSize: '22px', fontWeight: '500', lineHeight: '32px' }}>{day.format('DD')}</Typography>
        </Box>
      </Box>
    ))}
  </Box>
)

export default Header
