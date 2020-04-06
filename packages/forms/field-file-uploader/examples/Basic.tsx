import { Form } from '@uidu/form';
import React, { PureComponent } from 'react';
import FieldFileUploader from '..';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';

export default class Basic extends PureComponent {
  render() {
    return (
      <Form {...formDefaultProps}>
        <FieldFileUploader
          {...inputDefaultProps}
          XHRUploadOptions={{
            formData: true,
            endpoint: 'https://uidufundraising.uidu.local:8443/upload',
          }}
        />
        <FieldFileUploader
          {...inputDefaultProps}
          XHRUploadOptions={{
            formData: true,
            endpoint: 'https://uidufundraising.uidu.local:8443/upload',
          }}
        />
      </Form>
    );
  }
}
