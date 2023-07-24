# React Date Activity Display

![Month view](./src/Screen%20Shot%202023-07-24%20at%205.44.47%20PM.png)
![Week view](./src/Screen%20Shot%202023-07-24%20at%205.45.10%20PM.png)

## Usage
Install:
`npm i calendareact`

Use:
```
import Calendar, { Event } from 'calendareact'

const [createEventOpen, setCreateEventOpen] = useState(false)
const [editEventOpen, setEditEventOpen] = useState(false)
const [start, setStart] = useState<Dayjs | null>(null)
const [end, setEnd] = useState<Dayjs | null>(null)
const [event, setEvent] = useState<Event | null | undefined>(null)

const MyComponent = () => {
  const events: Event[] = [
    {
      title: 'Test',
      id: 'test',
      start: today.startOf('hour').hour(12),
      end: today.startOf('hour').hour(18)
    },
    {
      title: 'Test 2',
      id: 'test2',
      start: today.startOf('hour').subtract(1, 'day').hour(8),
      end: today.startOf('hour').subtract(1, 'day').hour(14)
    },
    {
      title: 'Test 3',
      id: 'test3',
      start: today.startOf('hour').subtract(2, 'day').hour(10),
      end: today.startOf('hour').subtract(2, 'day').hour(14)
    },
    {
      title: 'Test 4',
      id: 'test4',
      start: today.startOf('hour').subtract(3, 'day').hour(9),
      end: today.startOf('hour').subtract(3, 'day').hour(22)
    }
  ]

  return (
    <Calendar
      view='month'
      events={events}
      onSelectTime={(start: Dayjs | null, end: Dayjs | null) => {
        setStart(start)
        setEnd(end)
        setCreateEventOpen(true)
      }}
      onSelectEvent={(event: Event | null | undefined) => {
        setEvent(event)
        setEditEventOpen(true)
      }}
    />
  ) 
}
```
