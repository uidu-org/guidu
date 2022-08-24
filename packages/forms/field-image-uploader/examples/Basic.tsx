import React from 'react';
import { localUploadOptions } from '../../../media/media-core/src';
import {
  FieldExampleScaffold,
  inputDefaultProps,
} from '../../field-base/examples-utils';
import FieldImageUploader, { FieldImageUploaderProps } from '../src';

export default function Basic() {
  return (
    <FieldExampleScaffold<FieldImageUploaderProps>
      component={FieldImageUploader}
      {...inputDefaultProps}
      uploadOptions={localUploadOptions({
        endpoint: 'https://uidu.local:8443/upload',
      })}
      tw="aspect-w-16 aspect-h-9 border rounded"
      defaultValue="https://images.unsplash.com/photo-1496016943515-7d33598c11e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
      defaultImageUrl="https://images.unsplash.com/photo-1496016943515-7d33598c11e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
      // onBlur={this.onBlur}
      // onFocus={this.onFocus}
      help="Drag 'n' drop some files here, or click to select files"
      borderRadius={4}
    />
  );
}
