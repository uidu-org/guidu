import { Form } from '@uidu/form';
import React, { PureComponent } from 'react';
import FieldColorPicker from '..';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';

export default class Basic extends PureComponent {
  render() {
    return (
      <Form {...formDefaultProps}>
        <FieldColorPicker {...inputDefaultProps} />
        <FieldColorPicker
          {...inputDefaultProps}
          value="red"
          trigger={({ value, toggleDialog }) => (
            <div onClick={toggleDialog}>
              <p style={{ color: value }}>Ciaoone</p>
            </div>
          )}
        />
        <div className="form-group">
          <FieldColorPicker {...inputDefaultProps} layout="elementOnly" />
        </div>
      </Form>
    );
  }
}
