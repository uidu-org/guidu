import React from 'react';
import FieldTextarea from '..';
import { FieldExampleScaffold } from '../../field-base/examples-utils';

export default function Basic() {
  return (
    <FieldExampleScaffold
      component={FieldTextarea}
      defaultValue={'Long test'}
    />
  );
}
