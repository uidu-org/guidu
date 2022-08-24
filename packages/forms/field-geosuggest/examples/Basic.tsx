import React from 'react';
import FieldText from '../src';
import { FieldExampleScaffold } from '../../field-base/examples-utils';

export default function Basic() {
  return <FieldExampleScaffold component={FieldText} defaultValue="Milano" />;
}
