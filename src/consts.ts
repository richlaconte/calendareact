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
  small: {
    selected: {
      background: '#D9F3E3',
      text: '#2C2F35',
      dots: '#ffffff',
      hover: {
        background: '#57B379',
      },
    },
    unselected: {
      background: null,
      text: '#575D67',
      dots: '#D6D6D6',
      hover: {
        background: '#e0e0e0',
      },
    },
    notInMonth: {
      background: '#e0e0e0',
      text: '#CAD0DB',
      hover: {
        background: '#e0e0e0',
      },
    },
  },
}
