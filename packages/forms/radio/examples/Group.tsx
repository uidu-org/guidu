import { Form } from '@uidu/form';
import React, { Component } from 'react';
import { RadioGroup } from '..';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import { defaultOptions } from '../../select/examples-utils';

export default class Group extends Component<any, any> {
  state = {
    isInline: false,
  };

  onChange = (name, value) => {
    this.setState({
      isInline: value === 'inline',
    });
  };

  render() {
    const { isInline } = this.state;
    return (
      <Form {...formDefaultProps}>
        <div className="form-group">
          <RadioGroup
            {...inputDefaultProps}
            layout="elementOnly"
            isInline
            name="isInline"
            options={[
              {
                id: 'inline',
                name: 'Inline',
              },
              {
                id: 'stacked',
                name: 'Stacked',
              },
            ]}
            onChange={this.onChange}
            // onBlur={this.onBlur}
            // onFocus={this.onFocus}
            label="With change, blur & focus handlers"
            value={isInline ? 'inline' : 'stacked'}
          />
        </div>
        <RadioGroup
          {...inputDefaultProps}
          isInline={isInline}
          options={defaultOptions}
          onChange={this.onChange}
          // onBlur={this.onBlur}
          // onFocus={this.onFocus}
          label="With change, blur & focus handlers"
          value={defaultOptions[2].id}
        />
      </Form>
    );
  }
}
