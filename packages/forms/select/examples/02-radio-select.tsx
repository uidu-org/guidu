import React from 'react';
import { FieldExampleScaffold } from '../../field-base/examples-utils';
import { selectDefaultProps } from '../examples-utils';
import { RadioSelect } from '../src';
import { cities } from './common/data';

export default function RadioExample() {
  return (
    <FieldExampleScaffold
      component={RadioSelect}
      {...selectDefaultProps}
      className="multi-select"
      // options={cities}
      className="radio-select"
      classNamePrefix="react-select"
      options={[
        ...cities,
        {
          name: "super long name that noone will ever read because it's way too long",
          id: 'test',
        },
      ]}
      placeholder="Choose a City"
    />
  );
}
