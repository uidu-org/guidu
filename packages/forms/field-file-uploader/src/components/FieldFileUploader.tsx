import { Wrapper } from '@uidu/field-base';
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { Dashboard } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import React, { useEffect, useMemo, useRef } from 'react';
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
  XHRUploadOptions,
  ...rest
}: FieldFileUploaderProps) {
  const uppyInstance = useMemo(
    () =>
      Uppy(options)
        .use(XHRUpload, XHRUploadOptions)
        .on('complete', (result) => {
          handleChange(result.successful.map(({ response: { body } }) => body));
        }),
    [],
  );

  const uppy = useRef(uppyInstance);

  useEffect(() => {
    const currentUppyInstance = uppy.current;
    return () => currentUppyInstance.close();
  }, []);

  const handleChange = (results) => {
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
