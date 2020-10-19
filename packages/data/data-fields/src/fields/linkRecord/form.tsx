import Select from '@uidu/select';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';

export default class LinkRecordForm extends PureComponent<any> {
  static defaultProps = {
    options: [],
  };

  render() {
    const { options } = this.props;
    return (
      <>
        <FormattedMessage
          id="field.linkRecord.form.defaultValue.placeholder"
          defaultMessage="Enter default text"
        >
          {placeholder => (
            <Select
              name="defaultValue"
              placeholder={placeholder}
              label={
                <FormattedMessage
                  id="field.string.form.defaultValue.label"
                  defaultMessage="Default text"
                />
              }
              options={options}
              // defaultMenuIsOpen
            />
          )}
        </FormattedMessage>
      </>
    );
  }
}
