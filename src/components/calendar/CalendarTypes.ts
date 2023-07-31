import { Dayjs } from 'dayjs'

export type Event = {
  id: string
  start?: Dayjs
  end?: Dayjs
  date?: {
    start?: Dayjs
    end?: Dayjs
  }
  title: string
}

export type Day = {
  day: Dayjs
  inMonth: boolean
}

export type Colors = {
  primary: string
  secondary: string
  week: {
    background: {
      thisMonth: {
        selecting: string
        static: string
        event: string
      }
      otherMonth: {
        static: string
      }
    }
  }
  month: {
    background: {
      thisMonth: {
        selecting: string
        static: string
        event: string
        today: string
      }
      otherMonth: {
        static: string
      }
    }
    border: string
    text: {
      event: string
    }
  }
  small: {
    selected: {
      background: string | null
      text: string
      dots: string
      hover: {
        background: string | null
      }
    }
    unselected: {
      background: string | null
      text: string
      dots: string
      hover: {
        background: string | null
      }
    }
    notInMonth: {
      background: string
      text: string
      hover: {
        background: string
      }
    }
  }
}
