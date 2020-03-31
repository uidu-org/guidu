import AppSwitcherIcon from '@atlaskit/icon/glyph/app-switcher';
import { Form } from '@uidu/form';
import React from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import { PopupSelect } from '../src';

const options = [
  { label: 'Adelaide', value: 'adelaide' },
  { label: 'Brisbane', value: 'brisbane' },
  { label: 'Canberra', value: 'canberra' },
  { label: 'Darwin', value: 'darwin' },
  { label: 'Hobart', value: 'hobart' },
  { label: 'Melbourne', value: 'melbourne' },
  { label: 'Perth', value: 'perth' },
  { label: 'Sydney', value: 'sydney' },
];

const onChange = console.log;
const defaults = {
  ...inputDefaultProps,
  options,
  placeholder: 'Choose a City',
  onChange,
  getOptionLabel: ({ label }) => label,
  getOptionValue: ({ value }) => value,
};

const PopupSelectExample = () => (
  <Form {...formDefaultProps}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <PopupSelect
        {...defaults}
        target={({ ref }) => <button ref={ref}>Target</button>}
      />
      <PopupSelect
        {...defaults}
        target={({ ref }) => <button ref={ref}>W/O Search</button>}
        popperProps={{ placement: 'bottom', strategy: 'fixed' }}
        searchThreshold={10}
      />
      <PopupSelect
        {...defaults}
        target={({ ref }) => (
          <button ref={ref}>Placement: &ldquo;right-start&rdquo; (flip)</button>
        )}
        popperProps={{ placement: 'right-start' }}
      />
    </div>
    <div style={{ display: 'flex' }}>
      <div
        style={{
          background: 'AliceBlue',
          marginBottom: '1em',
          marginTop: '1em',
          padding: '1em',
          height: 500,
          width: 300,
          overflowY: 'auto',
        }}
      >
        <h3>Scroll Container</h3>
        <div style={{ height: 100 }} />
        <PopupSelect
          {...defaults}
          target={({ ref }) => <button ref={ref}>Target</button>}
        />
        <div style={{ height: 1000 }} />
      </div>
      <div style={{ margin: '1em' }}>
        <PopupSelect
          {...defaults}
          target={({ ref }) => (
            <button ref={ref}>
              <AppSwitcherIcon />
            </button>
          )}
        />
      </div>
    </div>
    <div style={{ height: 1000 }} />
  </Form>
);

export default PopupSelectExample;
