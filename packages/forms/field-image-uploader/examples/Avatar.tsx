import { Form } from '@uidu/form';
import React, { Component } from 'react';
import 'react-day-picker/lib/style.css';
import FieldImageUploader from '..';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';

export default class Avatar extends Component<any, any> {
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
        <div style={{ width: 140, height: 140, borderRadius: 140 }}>
          <FieldImageUploader
            {...inputDefaultProps}
            ratio="1by1"
            borderRadius={140}
            toolbar={() => null}
            onChange={this.onChange}
            // onBlur={this.onBlur}
            // onFocus={this.onFocus}
            label={null}
          />
        </div>
      </Form>
    );
  }
}
