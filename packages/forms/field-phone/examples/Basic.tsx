import React from 'react';
import { FieldExampleScaffold } from '../../field-base/examples-utils';
import FieldPhone from '../src';
import { FieldPhoneProps } from '../src/types';

export default function Basic() {
  return (
    <FieldExampleScaffold<FieldPhoneProps>
      component={FieldPhone}
      defaultValue="+393803306560"
      withCountrySelect
    />
  );
}
