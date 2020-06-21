import React from 'react';
import FieldPhone from '..';
import { FieldExampleScaffold } from '../../field-base/examples-utils';

export default function Basic() {
  return (
    <FieldExampleScaffold component={FieldPhone} defaultValue="+393803306560" />
  );
}
