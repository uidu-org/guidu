import React from 'react';
import {
  FieldExampleScaffold,
  inputDefaultProps,
} from '../../field-base/examples-utils';
import { AsyncSelect } from '../src';
import { cities } from './common/data';

// you control how the options are filtered
const filter = (inputValue: string) =>
  cities.filter((i) => i.name.toLowerCase().includes(inputValue.toLowerCase()));

// async load function using callback (promises also supported)
const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(filter(inputValue));
  }, 1000);
};

function AsyncExample() {
  return (
    <FieldExampleScaffold
      component={AsyncSelect}
      {...inputDefaultProps}
      loadOptions={loadOptions}
      options={cities}
      value={cities[0].id}
      placeholder="Choose a City"
    />
  );
}

export default AsyncExample;
