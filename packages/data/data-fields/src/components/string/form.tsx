import FieldText from '@uidu/field-text';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';

export default class StringForm extends PureComponent<any> {
  render() {
    return (
      <>
        <FormattedMessage
          id="field.string.form.defaultValue.placeholder"
          defaultMessage="Enter default text"
        >
          {placeholder => (
            <FieldText
              name="defaultValue"
              placeholder={placeholder}
              label={
                <FormattedMessage
                  id="field.string.form.defaultValue.label"
                  defaultMessage="Default text"
                />
              }
            />
          )}
        </FormattedMessage>
      </>
    );
  }
}
