import React from 'react';
import {
  FieldExampleRefs,
  inputDefaultProps,
} from '../../field-base/examples-utils';
import Checkbox from '../src';

export default function TestRef() {
  return <FieldExampleRefs {...inputDefaultProps} component={Checkbox} />;
}
