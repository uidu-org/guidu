// @flow
import React, { Component } from 'react';
import Button from '@uidu/button';
import { Form } from '@uidu/form';
import FieldPassword from '../src';
import { formDefaultProps, inputDefaultProps } from '../examples-utils';

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
          <FieldPassword
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
