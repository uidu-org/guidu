import { Form } from '@uidu/form';
import React, { PureComponent } from 'react';
import {
  localUploadOptions,
  s3UploadOptions,
} from '../../../media/media-core/src';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import FieldFileUploader from '../src';

export default class Basic extends PureComponent {
  render() {
    return (
      <Form {...formDefaultProps}>
        <FieldFileUploader
          {...inputDefaultProps}
          options={{
            autoProceed: true,
            allowMultipleUploadBatches: false,
          }}
          moduleOptions={{
            width: '100%',
            hideProgressAfterFinish: true,
          }}
          uploadOptions={localUploadOptions({
            endpoint: 'https://uidu.uidu.local:8443/upload',
          })}
        />
        <FieldFileUploader
          {...inputDefaultProps}
          options={{
            restrictions: {
              allowedFileTypes: ['image/jpeg', 'image/png'],
            },
          }}
          uploadOptions={s3UploadOptions({
            url: 'https://uidu.dev',
            type: 'file',
          })}
        />
      </Form>
    );
  }
}
