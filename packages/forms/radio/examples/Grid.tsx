import { Form } from '@uidu/form';
import React, { Component } from 'react';
import { RadioGrid } from '../src';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import { defaultOptions } from '../../select/examples-utils';

export default class Grid extends Component<any, any> {
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
        <RadioGrid
          {...inputDefaultProps}
          isInline={isInline}
          options={defaultOptions.slice(0, 5)}
          // onBlur={this.onBlur}
          // onFocus={this.onFocus}
          label="With change, blur & focus handlers"
          questions={[
            { id: 1, name: 'Test question' },
            {
              id: 2,
              name:
                'Lei dice che è solo stanchezza, ma secondo me non può essere.. vediamo i prossimi giorni come sta',
            },
          ]}
        />
      </Form>
    );
  }
}
