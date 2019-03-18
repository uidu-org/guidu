// @flow
import React from 'react';
import { Form, formDefaultProps } from '@uidu/form';
import { inputDefaultProps } from '@uidu/field-base/examples-utils';
import Select from '../src';

const formatOptionLabel = (option, { context }) => {
  if (context === 'menu') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>{option.label}</div>
        {option.description ? (
          <div
            style={{
              fontSize: 12,
              fontStyle: 'italic',
            }}
          >
            {option.description}
          </div>
        ) : null}
      </div>
    );
  }
  return option.value;
};
const OptionWithDescription = () => (
  <Form {...formDefaultProps}>
    <Select
      {...inputDefaultProps}
      formatOptionLabel={formatOptionLabel}
      getOptionLabel={({ label }) => label}
      getOptionValue={({ value }) => value}
      options={[
        {
          label: 'Adelaide',
          value: 'adelaide',
          description: 'A nice place to live',
        },
        {
          label: 'Brisbane',
          value: 'brisbane',
          description: 'A boisterous and energetic city',
        },
        { label: 'Canberra', value: 'canberra', description: 'The capital' },
        { label: 'Darwin', value: 'darwin' },
        { label: 'Hobart', value: 'hobart', description: 'Scenic, and serene' },
        {
          label: 'Melbourne',
          value: 'melbourne',
          description: 'Charming, and cultured',
        },
        { label: 'Perth', value: 'perth', description: 'Lovely city' },
        {
          label: 'Sydney',
          value: 'sydney',
          description: 'Nothing good happens ever happens here',
        },
      ]}
    />
  </Form>
);

export default OptionWithDescription;
