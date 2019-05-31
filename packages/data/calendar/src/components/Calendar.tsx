import { ShellBody } from '@uidu/shell';
import React, { PureComponent } from 'react';
import BigCalendar from 'react-big-calendar';
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/sass/styles.scss';
import calendarProps from '../utils';
import Event from './Event';
import Toolbar from './Toolbar';

// const DragAndDropCalendar = withDragAndDrop(BigCalendar);

export default class Calendar extends PureComponent<any> {
  render() {
    return (
      <ShellBody>
        <BigCalendar
          {...calendarProps(this.props)}
          {...this.props}
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
        />
      </ShellBody>
    );
  }
}
