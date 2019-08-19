import { Form } from '@uidu/form';
import React, { Component } from 'react';
import FieldCounter from '..';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';

export default class Basic extends Component<any, any> {
  state = {
    eventResult:
      'Click into and out of the input above to trigger onBlur & onFocus in the Fieldbase',
  };

  onChange = (name, value) => {
    this.setState({
      eventResult: `onChange called with value: ${value}`,
    });
  };

  onBlur = () => {
    this.setState({
      eventResult: 'onBlur called from FieldBase above',
    });
  };

  onFocus = () => {
    this.setState({
      eventResult: 'onFocus called from FieldBase above',
    });
  };

  render() {
    return (
      <Form {...formDefaultProps}>
        <FieldCounter
          {...inputDefaultProps}
          onChange={this.onChange}
          // onBlur={this.onBlur}
          // onFocus={this.onFocus}
          label="With change, blur & focus handlers"
        />

        <div
          className="mb-5"
          style={{
            borderStyle: 'dashed',
            borderWidth: '1px',
            borderColor: '#ccc',
            padding: '0.5em',
            color: '#ccc',
          }}
        >
          {this.state.eventResult}
        </div>
      </Form>
    );
  }
}
