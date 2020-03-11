import React from 'react';
import FieldNumber from '..';
import { FieldExampleScaffold } from '../../field-base/examples-utils';

export default function Basic() {
  return <FieldExampleScaffold component={FieldNumber} defaultValue={1000} />;
}
