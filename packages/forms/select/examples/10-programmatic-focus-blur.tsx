import Btn from '@uidu/button';
import { Form } from '@uidu/form';
import React, { Component, ElementRef } from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import Select from '../src';

const Button = ({ inline = true, ...props }: { inline?: boolean }) => (
  <div
    style={{
      display: inline ? 'inline-block' : 'block',
      paddingRight: 8,
      paddingTop: 8,
    }}
  >
    <Btn {...props} />
  </div>
);

export default class FocusBlurSelect extends Component<any> {
  select: ElementRef<any>;
  focus = () => {
    this.select.focus();
  };
  blur = () => {
    this.select.blur();
  };
  render() {
    return (
      <Form {...formDefaultProps}>
        <Select
          {...inputDefaultProps}
          ref={ref => {
            this.select = ref;
          }}
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
          getOptionLabel={({ label }) => label}
          getOptionValue={({ value }) => value}
          placeholder="Choose a City"
        />
        <div>
          <Button onClick={this.focus}>Focus</Button>
          <Button onClick={this.blur}>Blur</Button>
        </div>
      </Form>
    );
  }
}
