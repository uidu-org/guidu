import React from 'react';
import { FieldExampleScaffold } from '../../field-base/examples-utils';
// import styles from '../index.module.scss';
import FieldDate from '../src';

export default function Basic() {
  return (
    <FieldExampleScaffold
      component={FieldDate}
      defaultValue="1987-04-17"
      formatSubmit="yyyy-MM-dd"
      displayFormat="yyyy-MM-dd"
      // withCalendar
      // dayPickerProps={{ classNames: styles }}
    />
  );
}
