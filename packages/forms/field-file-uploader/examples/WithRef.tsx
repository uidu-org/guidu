import Button from '@uidu/button';
import Form, { useForm } from '@uidu/form';
import { localUploadOptions } from '@uidu/media-core';
import Uppy from '@uppy/core';
import React, { useRef } from 'react';
import FieldFileUploader from '../src';

export default function WithRef() {
  const form = useForm({});
  const uppy = useRef<Uppy>(null);

  return (
    <Form form={form}>
      <FieldFileUploader
        uploadOptions={localUploadOptions({
          endpoint: 'https://uidu.uidu.local:8443/upload',
        })}
        name="test"
        options={{
          restrictions: {
            maxNumberOfFiles: 1,
            allowedFileTypes: ['application/pdf'],
          },
        }}
        ref={uppy}
      />
      <Button
        onClick={() => {
          uppy.current?.addFile({
            name: 'test',
            type: 'text/plain',
            data: 'test',
          });
        }}
      >
        Add file
      </Button>
    </Form>
  );
}
