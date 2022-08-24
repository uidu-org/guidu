import React from 'react';
import { FieldExampleScaffold } from '../../field-base/examples-utils';
import FieldRange from '../src';

export default function Basic() {
  return (
    <FieldExampleScaffold
      component={FieldRange}
      defaultValue={40}
      min={0}
      max={100}
      step={1}
    />
  );
}
