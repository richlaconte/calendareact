import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

import Calendar from 'calendareact'

import colors from './colors'

import './styles.css'

const App = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(400)
  const [message, setMessage] = useState<string>('Clicked time')
  const [view, setView] = useState<'week' | 'month'>('week')

  const onSelectTime = (start: Dayjs | null, end: dayjs.Dayjs | null) => {
    alert(`${message}: ${start} - ${end}`)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '300px' }}>
          <Calendar
            events={[]}
            selectedDate={selectedDate}
            /* @ts-ignore-next-line */
            onSelectDate={(date: dayjs.Dayjs) => setSelectedDate(date)}
            colors={colors}
          />
        </div>
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <div>
            <div>
              View:{' '}
              <select value={view} onChange={(e) => setView(e.target.value as 'week' | 'month')}>
                <option value='week'>Week</option>
                <option value='month'>Month</option>
              </select>
            </div>
            <div>
              Width: <input type='number' value={width} onChange={(e) => setWidth(Number(e.target.value))} />
              px
            </div>
            <div>
              Height: <input type='number' value={height} onChange={(e) => setHeight(Number(e.target.value))} />
              px
            </div>
            <div>
              Message: <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div style={{ display: 'flex', width: `${width}px`, height: `${height}px` }}>
          <Calendar
            view={view}
            events={[]}
            selectedDate={selectedDate}
            /* @ts-ignore-next-line */
            onSelectTime={onSelectTime}
            colors={colors}
          />
        </div>
      </div>
    </div>
  )
}

export default App
