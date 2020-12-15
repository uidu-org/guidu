import { Form } from '@uidu/form';
import moment from 'moment';
import React, { Component } from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import styles from '../index.module.scss';
import FieldDate from '../src';

moment.locale('it');

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
        <FieldDate
          {...inputDefaultProps}
          onChange={this.onChange}
          // onBlur={this.onBlur}
          // onFocus={this.onFocus}
          label="With change, blur & focus handlers"
          containerClassName="d-block"
        />
        <div className="row">
          <div className="col-6">
            <FieldDate
              {...inputDefaultProps}
              name="withCalendar"
              withCalendar
              dayPickerProps={{ classNames: styles }}
            />
          </div>
        </div>
      </Form>
    );
  }
}
