/* eslint-disable prettier/prettier */
import React, { FC, useState } from 'react'
import { Box, Button, Popover, Tooltip, Typography } from '@mui/material'
import duration from 'dayjs/plugin/duration'

import AddIcon from '@mui/icons-material/Add'
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

  const eventLength = event.end.diff(event.start, 'minute')
  const eventHeight = (eventLength / 30) * 36

  const startDiff = event.start.diff(dayjs(event.start).startOf('hour'), 'minute')
  const eventOffset = startDiff >= 30 ? startDiff - 30 : startDiff
  const eventTop = (eventOffset / 30) * 36

  return (
    <Box position='relative' top='0px'>
      <Tooltip
        placement='top'
        arrow
        disableInteractive
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: event?.color?.bg || event?.project?.colors?.background || '#D6D6D6',
              borderLeft: `5px solid ${event?.color?.border || event?.project?.colors?.border || '#333333'}`,
              boxShadow:
                '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
              '& .MuiTooltip-arrow': {
                color: event?.color?.bg || event?.project?.colors?.background || '#D6D6D6',
              },
            },
          },
        }}
        title={
          eventHeight <= 20 && (
            <Box>
              <Typography>{event.title}</Typography>
              <Box display='flex'>
                <Typography>{event.start.format('h:mm A')}</Typography>
                <Typography sx={{ mx: 1 }}>-</Typography>
                <Typography>{event.end.format('h:mm A')}</Typography>
              </Box>
            </Box>
          )
        }
      >
        <div
          className='event'
          style={{
            position: 'relative',
            top: eventTop + 'px',
            left: '0px',
            marginTop: '1px',
            marginBottom: 0 - eventHeight + 'px',
            marginLeft: '1px',
            marginRight: '2px',
            zIndex: 1,
            backgroundColor: event?.color?.bg || event?.project?.colors?.background || '#D6D6D6',
            height: eventHeight - (eventHeight < 10 ? 1 : 3) + 'px',
            borderLeft: `5px solid ${event?.color?.border || event?.project?.colors?.border || '#333333'}`,
            borderRadius: '5px',
            cursor: 'pointer',
            flexGrow: 1,
            overflow: 'hidden',
          }}
          onClick={handleClick}
        >
          <Box maxWidth='100%' position='relative'>
            <Box
              sx={{
                userSelect: 'none',
                width: 'calc(100% - 20px)',
                marginTop: '2px',
                marginLeft: '6px',
                overflow: 'hidden',
              }}
            >
              {eventHeight > 20 && (
                <Typography noWrap textOverflow='ellipsis'>
                  {event?.title}
                </Typography>
              )}
            </Box>
          </Box>
          {eventHeight > 46 && (
            <Box maxWidth='100%' position='relative'>
              <Box
                sx={{
                  userSelect: 'none',
                  width: 'calc(100% - 20px)',
                  marginLeft: '6px',
                  overflow: 'hidden',
                }}
              >
                <Typography className='eventTitle' variant='caption' noWrap textOverflow='ellipsis'>
                  {event.start?.format('h:mm')} - {event.end?.format('h:mma')}
                </Typography>
              </Box>
            </Box>
          )}
        </div>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box p={2} width='302px'>
          <Box display='flex' justifyContent='space-between' alignItems='center' mb={1}>
            {event?.project?.title ? (
              <Box
                borderLeft={`5px solid ${event?.project?.colors?.border}`}
                bgcolor={event?.project?.colors?.background}
                borderRadius='5px'
                px={1}
                mr={2}
              >
                <Typography variant='caption'>{event?.project?.title}</Typography>
              </Box>
            ) : (
              <Box>
                <Button
                  variant='outlined'
                  onClick={handleEdit}
                  sx={{ height: '30px', paddingLeft: '8px', paddingRight: '12px' }}
                >
                  <AddIcon sx={{ marginRight: '10px' }} />
                  Add project
                </Button>
              </Box>
            )}
            <Box display='flex'>
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
        </Box>
      </Popover>
    </Box>
  )
}

export default Event
