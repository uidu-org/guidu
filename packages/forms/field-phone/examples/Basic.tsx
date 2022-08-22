import React from 'react';
import { FieldExampleScaffold } from '../../field-base/examples-utils';
import FieldPhone from '../src';

export default function Basic() {
  return (
    <FieldExampleScaffold component={FieldPhone} defaultValue="+393803306560" />
  );
}
