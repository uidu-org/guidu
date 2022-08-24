import React from 'react';
import { FieldExampleScaffold } from '../../field-base/examples-utils';
import { selectDefaultProps } from '../examples-utils';
import { CheckboxSelect } from '../src';
import { cities } from './common/data';

export default function CheckboxExample() {
  return (
    <FieldExampleScaffold
      component={CheckboxSelect}
      {...selectDefaultProps}
      className="checkbox-select"
      classNamePrefix="select"
      options={[
        ...cities,
        {
          name: "super long name that no one will ever read because it's way too long to be a realistic option but it will highlight the flexbox grow and shrink styles",
          id: 'test',
        },
      ]}
      placeholder="Choose a City"
    />
  );
}
