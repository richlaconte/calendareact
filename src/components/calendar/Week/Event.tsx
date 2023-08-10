import React, { FC, useState } from 'react'
import { Box, Popover, Typography } from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CheckIcon from '@mui/icons-material/Check'

import { useCalendar } from '../../../contexts/calendarContext'

const Event: FC<{ event: any; isStart: boolean; isEnd: boolean; i: any }> = ({ event, isStart, isEnd, i }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const { onSelectEvent, onDeleteEvent, onApproveEvent, showApprove } = useCalendar()

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    onSelectEvent && onSelectEvent(event)
    onSelectEvent && handleClose()
  }

  /*
  const handleDelete = () => {

  }
  */

  const open = Boolean(anchorEl)
  const id = open ? i : undefined

  return (
    <>
      <div
        className='event'
        style={{
          marginTop: isStart ? '3px' : '0px',
          marginBottom: isEnd ? '3px' : '0px',
          zIndex: 1,
          marginLeft: '4px',
          marginRight: '4px',
          backgroundColor: '#D6D6D6',
          height: `calc(100% + ${(isStart ? -3 : 0) + (isEnd ? -3 : 0)}px)`,
          width: '100%',
          borderLeft: '5px solid #333333',
          borderTopRightRadius: isStart ? '5px' : '0px',
          borderTopLeftRadius: isStart ? '5px' : '0px',
          borderBottomRightRadius: isEnd ? '5px' : '0px',
          borderBottomLeftRadius: isEnd ? '5px' : '0px',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        {isStart && (
          <Box maxWidth='100%' position='relative'>
            <Box
              sx={{
                userSelect: 'none',
                width: 'calc(100% - 20px)',
                position: 'absolute',
                left: '0',
                right: '0',
                top: '0',
                marginTop: '6px',
                marginLeft: '6px',
              }}
            >
              <Typography className='eventTitle' variant='caption'>
                {event.start?.format('h:mm A')}
              </Typography>
              <Typography>{event.title}</Typography>
            </Box>
          </Box>
        )}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box p={2} width='302px'>
          <Box>
            <Typography variant='caption'>CGT-0125</Typography>
          </Box>
          <Box>
            <Typography>{event.title}</Typography>
          </Box>
          <Box>
            <Typography>Lorem ipsum dolor sit amet consectetur. Est consectetur id ac vitae iaculis enim.</Typography>
          </Box>
          <Box display='flex' justifyContent='flex-end'>
            <Box
              width='32px'
              height='32px'
              border={`1px solid ${onSelectEvent ? '#858585' : '#EFEFEF'}`}
              bgcolor={onSelectEvent ? '#858585' : '#EFEFEF'}
              borderRadius='6px'
              display='flex'
              alignItems='center'
              justifyContent='center'
              mr={1}
              onClick={handleEdit}
              sx={{
                cursor: onSelectEvent ? 'pointer' : 'default',
              }}
            >
              <EditIcon sx={{ color: onSelectEvent ? 'white' : '#B8B8B8' }} />
            </Box>
            <Box
              width='32px'
              height='32px'
              border={`1px solid ${onDeleteEvent ? '#858585' : '#EFEFEF'}`}
              borderRadius='6px'
              display='flex'
              alignItems='center'
              justifyContent='center'
              mr={1}
              sx={{
                cursor: onDeleteEvent ? 'pointer' : 'default',
              }}
            >
              <DeleteOutlineIcon sx={{ color: '#B8B8B8' }} />
            </Box>
            {showApprove && (
              <Box
                width='32px'
                height='32px'
                border={`1px solid ${onApproveEvent ? '#858585' : '#EFEFEF'}`}
                borderRadius='6px'
                display='flex'
                alignItems='center'
                justifyContent='center'
                sx={{
                  cursor: onApproveEvent ? 'pointer' : 'default',
                }}
              >
                <CheckIcon sx={{ color: '#B8B8B8' }} />
              </Box>
            )}
          </Box>
        </Box>
      </Popover>
    </>
  )
}

export default Event
