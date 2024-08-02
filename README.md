# calendaЯReact

## Example app
[View the example app here](https://richlaconte.github.io/calendareact/)

## Overview

A simple react+dayjs calendar component with 3 views:
### Small
<img src="./example/public/small.png" alt="small" width="300"/>

### Week
<img src="./example/public/week.png" alt="week" width="600"/>

### Month
<img src="./example/public/month.png" alt="month" width="600"/>

## Installation
```npm i calendareact```

## Usage
```jsx
import React, { useState } from 'react';
import Calendar from 'calendareact';

function App() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
  return (
    <Calendar
      // events - list of events to display in the calendar
      events={[]}
      colors={colors}
      selectedDate={selectedDate}
      onSelectTime={onSelectTime}
      onSelectDate={(date: dayjs.Dayjs) => setSelectedDate(date)}
      onSelectEvent={onSelectEvent}
      onEditEvent={onEditEvent}
      onDeleteEvent={onDeleteEvent}
      onApproveEvent={onApproveEvent}
      showApprove={showApprove}
      // errors - display errors on day headers
      errors={errors}
      // dayActions - Add buttons to the day headers
      dayActions={dayActions}
    />
  );
}

export default App;
```
