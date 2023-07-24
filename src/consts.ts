import { Colors } from './components/calendar/CalendarTypes'

export const defaultColors: Colors = {
  primary: '#4caf50',
  secondary: '#ff9100',
  week: {
    background: {
      thisMonth: {
        selecting: '#e0e0e0',
        static: '#ffffff',
        event: '#e0e0e0',
      },
      otherMonth: {
        static: '#e0e0e0',
      },
    },
  },
  month: {
    background: {
      thisMonth: {
        selecting: '#B7C9E2',
        static: '#ffffff',
        event: '#6699CD',
        today: '#B5C7CC',
      },
      otherMonth: {
        static: '#e0e0e0',
      },
    },
    border: '1px solid black',
    text: {
      event: '#ffffff',
    },
  },
}
