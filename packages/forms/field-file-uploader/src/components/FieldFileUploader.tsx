import { Wrapper } from '@uidu/field-base';
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { Dashboard } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import React, { useEffect, useRef } from 'react';
import { FieldFileUploaderProps } from '../types';

const defaultOptions = {
  debug: true,
  allowMultipleUploads: true,
  restrictions: {
    maxNumberOfFiles: null,
    minNumberOfFiles: null,
    maxFileSize: null,
    allowedFileTypes: null,
  },
  autoProceed: true,
};

function FieldFileUploader({
  onSetValue,
  onChange,
  name,
  options = defaultOptions,
  ...rest
}: FieldFileUploaderProps) {
  const uppy = useRef(
    Uppy(options)
      .use(XHRUpload, {
        formData: true,
        endpoint:
          'https://uidufundraising.uidu.local:8443/rails/active_storage/direct_uploads',
        withCredentials: true,
      })
      .on('complete', result => {
        handleChange(
          result.successful.map(
            ({
              response: {
                body: { signed_id, filename },
              },
            }: any) => ({
              signed_id,
              filename,
            }),
          ),
        );
      }),
  );

  useEffect(() => {
    const currentUppyInstance = uppy.current;
    return () => currentUppyInstance.close();
  }, []);

  const handleChange = results => {
    onSetValue(results);
    onChange(name, results);
  };

  return (
    <Wrapper {...rest}>
      <Dashboard
        uppy={uppy.current}
        height={350}
        locale={{
          strings: {
            // Text to show on the droppable area.
            // `%{browse}` is replaced with a link that opens the system file selection dialog.
            dropPaste: 'Drop here or %{browse}',
            // Used as the label for the link that opens the system file selection dialog.
            browse: 'browse',
          },
        }}
        {...rest}
      />
    </Wrapper>
  );
}

export default FieldFileUploader;
