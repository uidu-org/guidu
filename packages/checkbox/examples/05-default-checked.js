// @flow
import React, { Component } from 'react';
import { Form } from '@uidu/form';
import { Checkbox } from '../src/index';

export default class ControlledExample extends Component<void> {
  render() {
    return (
      <Form>
        Default Checked Checkbox
        <Checkbox
          defaultChecked
          label="Default Checked Checkbox"
          value="Default Checked Checkbox"
          name="default-checked-checkbox"
        />
      </Form>
    );
  }
}
