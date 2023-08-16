import React, { FC, useState } from 'react'
import { Box, Button, Popover, Typography } from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CheckIcon from '@mui/icons-material/Check'
import EventIcon from '@mui/icons-material/Event'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

import { useCalendar } from '../../../contexts/calendarContext'

const Event: FC<{ event: any; i: any }> = ({ event, i }) => {
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

  const handleDelete = () => {
    onDeleteEvent && onDeleteEvent(event)
    handleClose()
  }

  const open = Boolean(anchorEl)
  const id = open ? i : undefined

  return (
    <Box display='flex' flexGrow={1} height='100%'>
      <div
        className='event'
        style={{
          marginTop: event.isStart ? '2px' : '0px',
          marginBottom: event.isEnd ? '2px' : '0px',
          zIndex: 1,
          backgroundColor: event?.color?.bg || '#D6D6D6',
          height: `calc(100% + ${(event.isStart ? -2 : 0) + (event.isEnd ? -2 : 0)}px)`,
          borderLeft: `5px solid ${event?.color?.border || '#333333'}`,
          borderTopRightRadius: event.isStart ? '5px' : '0px',
          borderTopLeftRadius: event.isStart ? '5px' : '0px',
          borderBottomRightRadius: event.isEnd ? '5px' : '0px',
          borderBottomLeftRadius: event.isEnd ? '5px' : '0px',
          cursor: 'pointer',
          flexGrow: 1,
        }}
        onClick={handleClick}
      >
        {event.isStart && (
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
                overflow: 'hidden',
              }}
            >
              <Typography className='eventTitle' variant='caption' noWrap textOverflow='ellipsis'>
                {event.start?.format('h:mm A')}
              </Typography>
            </Box>
          </Box>
        )}
        {event.isSecond && (
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
                overflow: 'hidden',
              }}
            >
              <Typography noWrap textOverflow='ellipsis'>
                {event?.title}
              </Typography>
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
            <Typography variant='caption'>{event?.project}</Typography>
          </Box>
          <Box>
            <Typography>{event.title}</Typography>
          </Box>
          {event?.description && (
            <Box>
              <Typography>{event?.description}</Typography>
            </Box>
          )}
          <Box display='flex' mt={2}>
            <Box mr={2}>
              <EventIcon />
            </Box>
            <Box>{event.start?.format('MMMM, DD YYYY')}</Box>
          </Box>
          <Box display='flex'>
            <Box mr={2}>
              <AccessTimeIcon />
            </Box>
            <Box>
              {event.start?.format('h:mm A')} - {event.end?.format('h:mm A')}
            </Box>
          </Box>
          <Box display='flex' justifyContent='flex-end'>
            <Button
              onClick={handleEdit}
              variant='outlined'
              size='small'
              sx={{ minWidth: '32px', width: '32px', height: '32px', padding: '0px', marginRight: '8px' }}
            >
              <EditIcon />
            </Button>
            <Button
              onClick={handleDelete}
              variant='outlined'
              size='small'
              color='error'
              sx={{ minWidth: '32px', width: '32px', height: '32px', padding: '0px' }}
            >
              <DeleteOutlineIcon />
            </Button>
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
    </Box>
  )
}

export default Event
