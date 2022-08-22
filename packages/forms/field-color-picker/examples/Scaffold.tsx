import React from 'react';
import {
  FieldExampleScaffold,
  inputDefaultProps,
} from '../../field-base/examples-utils';
import FieldColorPicker from '../src';

export default function Scaffold() {
  return (
    <FieldExampleScaffold {...inputDefaultProps} component={FieldColorPicker} />
  );
}
