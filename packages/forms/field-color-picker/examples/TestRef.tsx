import React from 'react';
import {
  FieldExampleRefs,
  inputDefaultProps,
} from '../../field-base/examples-utils';
import FieldColorPicker from '../src';

export default function TestRef() {
  return (
    <FieldExampleRefs {...inputDefaultProps} component={FieldColorPicker} />
  );
}
