// @flow
import React, { Component } from 'react';
import { Form, formDefaultProps } from '@uidu/form';
import { inputDefaultProps } from '@uidu/field-base/examples-utils';
import FieldTime from '../src';

export default class FormExample extends Component<void, void> {
  state = {
    value: null,
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <Form
          {...formDefaultProps}
          handleSubmit={model => this.setState({ value: model })}
        >
          <FieldTime
            {...inputDefaultProps}
            label="Required with no default value"
            required
            name="example-text"
          />
        </Form>
        <p>The data submitted by the form will appear below:</p>
        {value && JSON.stringify(value, null, 2)}
      </div>
    );
  }
}
