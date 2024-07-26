# calendaReact
A simple react+dayjs calendar component with 3 views:
- Small
<img src="./example/public/small.png" alt="small" width="200"/>
- Week
<img src="./example/public/small.png" alt="week" width="300"/>
- Month
<img src="./example/public/small.png" alt="month" width="300"/>

## Example app
[https://richlaconte.github.io/calendareact/](View the example app here)

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
