import React from 'react';
import { Calendar as BigCalendar } from 'react-big-calendar';
import calendarProps from '../utils';
import Event from './Event';
import Toolbar from './Toolbar';

// const DragAndDropCalendar = withDragAndDrop(BigCalendar);

export default function Calendar({
  onEventDrop = () => {},
  onEventResize = () => {},
  events = [],
  components,
  ...rest
}) {
  return (
    <>
      <BigCalendar
        {...calendarProps({ events, onEventDrop, onEventResize })}
        defaultView="month"
        selectable={false}
        resizable={false}
        views={['month', 'week', 'day']}
        components={{
          toolbar: Toolbar,
          event: Event,
          month: {
            event: Event,
          },
          // ...components,
        }}
        {...rest}
      />
    </>
  );
}
