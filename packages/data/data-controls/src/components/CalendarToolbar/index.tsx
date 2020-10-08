import React from 'react';
import { createPortal } from 'react-dom';
import CalendarNavigator from './CalendarNavigator';
import CalendarView from './CalendarView';

export default function CalendarToolbar(props) {
  return createPortal(
    <>
      <CalendarNavigator {...props} />
      <CalendarView {...props} />
    </>,
    document.getElementById('calendar-toolbar'),
  );
}
