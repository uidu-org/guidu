import React from 'react';
import { FieldExampleScaffold } from '../../field-base/examples-utils';
import FieldToggle from '../src';

export default function Basic() {
  return <FieldExampleScaffold component={FieldToggle} defaultValue={true} />;
}
