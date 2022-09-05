import loadable from '@loadable/component';
import React, { Component } from 'react';
import 'react-day-picker/dist/style.css';

const DayPicker = (loadable as any).lib(() => import('react-day-picker'));

export default class DatePicker extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: Date.parse(props.value),
    };
  }

  getValue() {
    return this.state.selectedDay;
  }

  isPopup() {
    return true;
  }

  onChange = (day, { selected }) => {
    this.setState(
      {
        selectedDay: selected ? undefined : day,
      },
      () => this.props.api.stopEditing(),
    );
  };

  render() {
    return (
      <div
        tabIndex={1} // important - without this the keypresses wont be caught
      >
        <DayPicker fallback={<div>Loading...</div>}>
          {({ DayPicker: Picker }) => (
            <Picker
              selectedDays={this.state.selectedDay}
              onDayClick={this.onChange}
              todayButton="Go to Today"
            />
          )}
        </DayPicker>
      </div>
    );
  }
}
