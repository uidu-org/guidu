// @flow
import React from 'react';
import { Form, formDefaultProps } from '@uidu/form';
import { inputDefaultProps } from '@uidu/field-base';

import { AtlassianIcon } from '@atlaskit/logo';
import Select from '../src';

const formatOptionLabel = (option, { context }) => {
  if (context === 'menu') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AtlassianIcon size="small" />
        <span
          style={{
            paddingLeft: 8,
            paddingBottom: 0,
          }}
        >
          {option.label}
        </span>
      </div>
    );
  }
  return option.label;
};
const ElementBeforeExample = () => (
  <Form {...formDefaultProps}>
    <Select
      {...inputDefaultProps}
      formatOptionLabel={formatOptionLabel}
      getOptionLabel={({ label }) => label}
      getOptionValue={({ value }) => value}
      options={[
        { label: 'Adelaide', value: 'adelaide' },
        { label: 'Brisbane', value: 'brisbane' },
        { label: 'Canberra', value: 'canberra' },
        { label: 'Darwin', value: 'darwin' },
        { label: 'Hobart', value: 'hobart' },
        { label: 'Melbourne', value: 'melbourne' },
        { label: 'Perth', value: 'perth' },
        { label: 'Sydney', value: 'sydney' },
      ]}
    />
  </Form>
);

export default ElementBeforeExample;
