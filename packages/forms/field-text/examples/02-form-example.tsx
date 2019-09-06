import { Form } from '@uidu/form';
import React, { Component } from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import FieldText from '../src';

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
          // handleSubmit={async model => this.setState({ value: model })}
        >
          <FieldText
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
