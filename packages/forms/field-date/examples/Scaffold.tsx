import React from 'react';
import { FieldExampleScaffold } from '../../field-base/examples-utils';
import FieldDate from '../src';

export default function Basic() {
  return (
    <FieldExampleScaffold component={FieldDate} defaultValue="1987/04/17" />
  );
}
