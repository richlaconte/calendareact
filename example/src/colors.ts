import { Colors } from 'calendareact'

const colors: Colors = {
  primary: '#4caf50',
  secondary: '#ff9100',
  small: {
    today: {
      border: '1px solid #001858',
      text: '#2C2F35',
      dots: '#ffffff',
      hover: {
        background: '#6BDA94',
      },
    },
    selected: {
      background: '#f3d2c1',
      text: '#2C2F35',
      dots: '#ffffff',
      hover: {
        background: '#f582ae',
      },
    },
    unselected: {
      text: '#575D67',
      dots: '#D6D6D6',
      hover: {
        background: '#fef6e4',
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
  week: {
    today: {
      background: '#8bd3dd',
    },
    selected: {
      background: '#fef6e4',
    },
    selectedArea: '#f3d2c1',
  },
  month: {
    selectedArea: '#f3d2c1',
    today: {
      background: '#8bd3dd',
    },
    selected: {
      background: '#fef6e4',
    },
    notInMonth: {
      background: '#e0e0e0',
    },
  },
}

export default colors
