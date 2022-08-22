import React from 'react';
import { FieldExampleScaffold } from '../../field-base/examples-utils';
import FieldCounter from '../src';

export default function Basic() {
  return <FieldExampleScaffold component={FieldCounter} defaultValue={12} />;
}
