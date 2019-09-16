import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import CalendarNavigator from './CalendarNavigator';
import CalendarView from './CalendarView';

export default class CalendarToolbar extends PureComponent {
  render() {
    return createPortal(
      <>
        <CalendarNavigator {...this.props} />
        <CalendarView {...this.props} />
      </>,
      document.getElementById('calendar-toolbar'),
    );
  }
}
