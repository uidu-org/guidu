import React from 'react';
import {
  FieldRefTester,
  inputDefaultProps,
} from '../../field-base/examples-utils';
import FieldDate from '../src';

export default function TestRef() {
  return <FieldRefTester {...inputDefaultProps} component={FieldDate} />;
}
