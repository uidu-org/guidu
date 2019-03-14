// @flow
import React from 'react';
import { Form, formDefaultProps } from '@uidu/form';
import { inputDefaultProps } from '@uidu/field-base';

import Tooltip from '@uidu/tooltip';
import Select, { components } from '../src';

const Option = props => {
  const { data } = props; // eslint-disable-line react/prop-types
  const { tooltipDescription, tooltipPosition } = data;
  return (
    <Tooltip content={tooltipDescription} position={tooltipPosition}>
      <components.Option data={data} {...props} />
    </Tooltip>
  );
};

const ElementBeforeExample = () => (
  <Form {...formDefaultProps}>
    <Select
      {...inputDefaultProps}
      components={{
        Option,
      }}
      getOptionLabel={({ label }) => label}
      getOptionValue={({ value }) => value}
      options={[
        {
          label: 'Adelaide',
          value: 'adelaide',
          tooltipDescription: 'Adelaide is a good city',
          tooltipPosition: 'left',
        },
        {
          label: 'Brisbane',
          value: 'brisbane',
          tooltipDescription: 'Brisbane is a fine city',
          tooltipPosition: 'right ',
        },
        {
          label: 'Canberra',
          value: 'canberra',
          tooltipDescription: 'Canberra is a city',
          tooltipPosition: 'bottom',
        },
        {
          label: 'Darwin',
          value: 'darwin',
          tooltipDescription: 'Darwin is a fine city',
          tooltipPosition: 'top',
        },
        {
          label: 'Hobart',
          value: 'hobart',
          tooltipDescription: 'Hobart is a beautiful city',
          tooltipPosition: 'mouse',
        },
        {
          label: 'Melbourne',
          value: 'melbourne',
          tooltipDescription: 'Melbourne is a cultured city',
          tooltipPosition: 'top',
        },
        {
          label: 'Perth',
          value: 'perth',
          tooltipDescription: 'Perth is a serene town',
          tooltipPosition: 'bottom',
        },
        {
          label: 'Sydney',
          value: 'sydney',
          tooltipDescription: 'Sydney is the shadow of Atlantis',
          tooltipPosition: 'left',
        },
      ]}
    />
  </Form>
);

export default ElementBeforeExample;
