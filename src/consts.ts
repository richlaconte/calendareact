import { Colors } from './components/calendar/CalendarTypes'

export const defaultColors: Colors = {
  primary: '#4caf50',
  secondary: '#ff9100',
  week: {
    today: {
      background: '#F0F1F2',
    },
    selected: {
      background: '#eaf6ff',
    },
  },
  month: {},
  small: {
    today: {
      background: undefined,
      border: '1px solid #575D67',
      text: '#2C2F35',
      dots: '#ffffff',
      hover: {
        background: '#6BDA94',
      },
    },
    selected: {
      background: '#D9F3E3',
      text: '#2C2F35',
      dots: '#ffffff',
      hover: {
        background: '#6BDA94',
      },
    },
    unselected: {
      background: undefined,
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
