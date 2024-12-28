/* eslint-disable prettier/prettier */
import React, { FC, useState } from 'react'
import { Box, Button, Popover, Typography } from '@mui/material'
import duration from 'dayjs/plugin/duration'

import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CheckIcon from '@mui/icons-material/Check'
import EventIcon from '@mui/icons-material/Event'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

import { useCalendar } from '../../../contexts/calendarContext'

import dayjs from 'dayjs'
dayjs.extend(duration)

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

  const marginTop = () => {
    if (event.isStart) return '2px'
    return '0px'
  }

  const eventLength = event.end.diff(event.start, 'minute')
  console.log('eventLength', eventLength)
  const eventHeight = (eventLength / 60) * 36 * 2 - 4

  return (
    <Box display='flex' flexGrow={1} height='36px' width='100%' alignItems={event.isPartialStart ? 'flex-end' : ''}>
      <div
        className='event'
        style={{
          position: 'relative',
          top: '0px',
          left: '0px',
          marginTop: marginTop(),
          marginBottom: event.isEnd ? '2px' : '0px',
          marginRight: '2px',
          zIndex: 1,
          backgroundColor: event?.color?.bg || event?.project?.colors?.background || '#D6D6D6',
          height: eventHeight + 'px',
          borderLeft: `5px solid ${event?.color?.border || event?.project?.colors?.border || '#333333'}`,
          borderTopRightRadius: event.isStart || event.isPartialStart ? '5px' : '0px',
          borderTopLeftRadius: event.isStart || event.isPartialStart ? '5px' : '0px',
          borderBottomRightRadius: '5px',
          borderBottomLeftRadius: '5px',
          cursor: 'pointer',
          flexGrow: 1,
        }}
        onClick={handleClick}
      >
        {event.isTitle && (
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
              {event.isPartialStart || event.isPartialEnd ? null : (
                <Typography noWrap textOverflow='ellipsis'>
                  {event?.title}
                </Typography>
              )}
            </Box>
          </Box>
        )}
        {event.isSecond && !event.isPartialEnd && (
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
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box p={2} width='302px'>
          <Box display='flex'>
            <Box
              borderLeft={`5px solid ${event?.project?.colors?.border}`}
              bgcolor={event?.project?.colors?.background}
              borderRadius='5px'
              px={1}
              mb={1}
            >
              <Typography variant='caption'>{event?.project?.title}</Typography>
            </Box>
          </Box>
          <Box>
            <Typography fontSize='18px'>{event.title}</Typography>
          </Box>
          {event?.description && (
            <Box>
              <Typography noWrap>{event?.description}</Typography>
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
              {event.start?.format('h:mm A')} - {event.end?.format('h:mm A')} (
              {event.end.diff(event.start, 'hour', true).toFixed(2)} hrs)
            </Box>
          </Box>
          <Box display='flex' justifyContent='flex-end'>
            <Button
              onClick={handleDelete}
              variant='outlined'
              size='small'
              color='error'
              sx={{ minWidth: '32px', width: '32px', height: '32px', padding: '0px', marginRight: '8px' }}
            >
              <DeleteOutlineIcon />
            </Button>
            <Button
              onClick={handleEdit}
              variant='outlined'
              size='small'
              sx={{ minWidth: '32px', width: '32px', height: '32px', padding: '0px' }}
            >
              <EditIcon />
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
