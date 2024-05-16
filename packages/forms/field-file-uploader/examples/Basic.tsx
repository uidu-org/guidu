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
        restrictions: {
          maxNumberOfFiles: 1,
          allowedFileTypes: [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/csv',
            'text/plain',
          ],
        },
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
