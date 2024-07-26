# calendaReact
A simple react+dayjs calendar component with 3 views:
### Small
<img src="./example/public/small.png" alt="small" width="300"/>

### Week
<img src="./example/public/week.png" alt="week" width="400"/>

### Month
<img src="./example/public/month.png" alt="month" width="400"/>

## Example app
[View the example app here](https://richlaconte.github.io/calendareact/)

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
      events={[]}
      selectedDate={selectedDate}
      onSelectDate={(date: dayjs.Dayjs) => setSelectedDate(date)}
      colors={colors}
    />
  );
}

export default App;
```
