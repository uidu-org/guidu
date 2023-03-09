import React from 'react';
import 'react-day-picker/dist/style.css';
import { FieldExampleScaffold } from '../../field-base/examples-utils';
import FieldDateRange from '../src';

export default function Basic() {
  return (
    <FieldExampleScaffold
      component={FieldDateRange}
      defaultValue={{ from: '', to: '' }}
      formatSubmit="yyyy-MM-dd"
      displayFormat="yyyy-MM-dd"
      // withCalendar
      // dayPickerProps={{ classNames: styles }}
    />
  );
}
