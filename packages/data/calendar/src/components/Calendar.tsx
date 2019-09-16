import React, { PureComponent } from 'react';
import { Calendar as BigCalendar } from 'react-big-calendar';
import calendarProps from '../utils';
import Event from './Event';
import Toolbar from './Toolbar';

// const DragAndDropCalendar = withDragAndDrop(BigCalendar);

export default class Calendar extends PureComponent<any> {
  static defaultProps = {
    onEventDrop: () => {},
    onEventResize: () => {},
    events: [],
  };

  render() {
    const { events, onEventResize, onEventDrop } = this.props;
    return (
      <BigCalendar
        {...calendarProps({ events, onEventDrop, onEventResize })}
        defaultView="month"
        selectable={false}
        resizable={false}
        views={['month', 'week', 'day']}
        components={{
          toolbar: Toolbar,
          month: {
            event: Event,
          },
        }}
        {...this.props}
      />
    );
  }
}
