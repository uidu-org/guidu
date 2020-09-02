import React from 'react';
import FieldRange from '../src';
import { FieldExampleScaffold } from '../../field-base/examples-utils';

export default function Basic() {
  return (
    <FieldExampleScaffold
      component={FieldRange}
      defaultValue={40}
      min={0}
      max={100}
    />
  );
}
