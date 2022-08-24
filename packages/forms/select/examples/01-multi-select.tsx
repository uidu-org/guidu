import React from 'react';
import { FieldExampleScaffold } from '../../field-base/examples-utils';
import { selectDefaultProps } from '../examples-utils';
import Select from '../src';
import { cities } from './common/data';

export default function MultiExample() {
  return (
    <FieldExampleScaffold
      component={Select}
      {...selectDefaultProps}
      className="multi-select"
      // options={cities}
      multiple
      isSearchable={false}
      placeholder="Choose a City"
      options={cities}
      defaultValue={[cities[0].id]}
    />
  );
}
