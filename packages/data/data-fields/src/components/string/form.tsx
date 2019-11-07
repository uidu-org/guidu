import FieldText from '@uidu/field-text';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function StringForm() {
  return (
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
  );
}
