import React from 'react';
import { FieldExampleScaffold } from '../../field-base/examples-utils';
import { selectDefaultProps } from '../examples-utils';
import Select from '../src';

export default function SingleSelect() {
  return (
    <FieldExampleScaffold
      component={Select}
      {...selectDefaultProps}
      placeholder="Choose a City"
      defaultValue={selectDefaultProps.options[0].id}
      isFocused
    />
  );
}
