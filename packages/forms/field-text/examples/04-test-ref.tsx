import React from 'react';
import {
  FieldRefTester,
  inputDefaultProps,
} from '../../field-base/examples-utils';
import FieldText from '../src';

export default function TestRef() {
  return <FieldRefTester {...inputDefaultProps} component={FieldText} />;
}
