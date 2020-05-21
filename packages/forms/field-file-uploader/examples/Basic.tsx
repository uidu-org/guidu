import { Form } from '@uidu/form';
import React, { PureComponent } from 'react';
import FieldFileUploader from '..';
import {
  localUploadOptions,
  s3UploadOptions,
} from '../../../media/media-core/src';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';

export default class Basic extends PureComponent {
  render() {
    return (
      <Form {...formDefaultProps}>
        <FieldFileUploader
          {...inputDefaultProps}
          uploadOptions={localUploadOptions({
            url: 'https://uidufundraising.uidu.local:8443/upload',
          })}
        />
        <FieldFileUploader
          {...inputDefaultProps}
          uploadOptions={s3UploadOptions({
            url: 'https://uidu-it.org',
            type: 'file',
          })}
        />
      </Form>
    );
  }
}
