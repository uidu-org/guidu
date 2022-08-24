import React from 'react';
import { FieldExampleScaffold } from '../../field-base/examples-utils';
import styles from '../index.module.scss';
import FieldDate from '../src';

export default function Calendar() {
  return (
    <FieldExampleScaffold
      component={FieldDate}
      defaultValue="2022-08-22"
      withCalendar
      dayPickerProps={{ classNames: styles }}
    />
  );
}
