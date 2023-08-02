import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import Calendar from '../src'

describe('Common render', () => {
  xit('renders without crashing', () => {
    render(<Calendar view='week' events={[]} onSelectTime={() => null} onSelectEvent={() => null} />)
  })
})
