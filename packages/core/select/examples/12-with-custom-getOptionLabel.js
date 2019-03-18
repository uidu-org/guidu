// @flow
import React, { Component } from 'react';
import { Form, formDefaultProps } from '@uidu/form';
import { inputDefaultProps } from '@uidu/field-base/examples-utils';
import { Checkbox } from '@uidu/checkbox';
import { CheckboxSelect } from '../src';

// data imported for brevity; equal to the options from Single Select example

const customGetOptionLabel = option => {
  return option.label.length >= 10
    ? `${option.label.substring(0, 7)}...`
    : option.label;
};
export default class withCustomGetOptionLabel extends Component<
  *,
  { useCustomOptionLabel: boolean },
> {
  state = {
    useCustomOptionLabel: true,
  };
  toggleValue = ({ value }: Object) =>
    this.setState(state => ({ ...state, [value]: !state[value] }));
  render() {
    return (
      <Form {...formDefaultProps}>
        {this.state.useCustomOptionLabel ? (
          <CheckboxSelect
            {...inputDefaultProps}
            options={[
              {
                label:
                  'THIS IS A REALLY LONG LABEL FOR A REALLY NOT SO LONG VALUE',
                value: 'one',
              },
            ]}
            placeholder="Choose a City"
            getOptionLabel={customGetOptionLabel}
            getOptionValue={({ value }) => value}
          />
        ) : (
          <CheckboxSelect
            {...inputDefaultProps}
            options={[
              {
                label:
                  'THIS IS A REALLY LONG LABEL FOR A REALLY NOT SO LONG VALUE',
                value: 'one',
              },
            ]}
            placeholder="Choose a City"
            getOptionLabel={({ label }) => label}
            getOptionValue={({ value }) => value}
          />
        )}

        <Checkbox
          value="useCustomOptionLabel"
          label="Define custom getOptionLabel"
          name="defineCustomGetOptionLabel"
          onChange={this.toggleValue}
        />
      </Form>
    );
  }
}
