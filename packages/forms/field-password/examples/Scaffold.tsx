import React from 'react';
import FieldPassword from '..';
import { FieldExampleScaffold } from '../../field-base/examples-utils';

export default function Basic() {
  return (
    <FieldExampleScaffold
      component={FieldPassword}
      defaultValue={1000}
      type="password"
    />
  );
}
