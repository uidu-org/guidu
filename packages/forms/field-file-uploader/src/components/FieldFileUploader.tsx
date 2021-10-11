import { Wrapper } from '@uidu/field-base';
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { Dashboard } from '@uppy/react';
import React, { useEffect, useMemo } from 'react';
import { FieldFileUploaderProps } from '../types';

const defaultOptions = {
  debug: true,
  allowMultipleUploadBatches: true,
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
  uploadOptions,
  ...rest
}: FieldFileUploaderProps) {
  const uppy = useMemo(
    () =>
      new Uppy(options)
        .use(uploadOptions.module, uploadOptions.options)
        .on('complete', (result) => {
          handleChange(result.successful.map(uploadOptions.responseHandler));
        }),
    [],
  );

  useEffect(() => {
    return () => uppy.close();
  }, []);

  const handleChange = (results) => {
    onSetValue(results);
    onChange(name, results);
  };

  return (
    <Wrapper {...rest}>
      <Dashboard
        uppy={uppy}
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
