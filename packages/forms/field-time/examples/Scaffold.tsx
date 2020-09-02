import React from 'react';
import FieldTime from '../src';
import { FieldExampleScaffold } from '../../field-base/examples-utils';

export default function Basic() {
  return <FieldExampleScaffold component={FieldTime} defaultValue="10:00" />;
}
