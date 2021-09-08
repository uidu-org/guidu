import { Form } from '@uidu/form';
import React, { PureComponent } from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import FieldColorPicker from '../src';

export default class Basic extends PureComponent {
  render() {
    return (
      <Form {...formDefaultProps}>
        <FieldColorPicker {...inputDefaultProps} />
        <FieldColorPicker
          {...inputDefaultProps}
          value="#006688"
          // trigger={({ value, toggleDialog }) => (
          //   <div onClick={toggleDialog}>
          //     <p style={{ color: value }}>Ciaoone</p>
          //   </div>
          // )}
        />
        <div className="form-group">
          <FieldColorPicker {...inputDefaultProps} layout="elementOnly" />
        </div>
      </Form>
    );
  }
}
