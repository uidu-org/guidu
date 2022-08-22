import React from 'react';
import { localUploadOptions } from '../../../media/media-core/src';
import { FieldExampleScaffold } from '../../field-base/examples-utils';
import FieldFileUploader from '../src';

export default function Basic() {
  return (
    <FieldExampleScaffold
      component={FieldFileUploader}
      defaultValue={{ id: 'test', filename: 'Foo.png' }}
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
  );
}
