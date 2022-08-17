import { useController, Wrapper } from '@uidu/field-base';
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
  onChange = () => {},
  name,
  value: defaultValue,
  options = {},
  moduleOptions = {},
  uploadOptions,
  ...rest
}: FieldFileUploaderProps) {
  const { field, wrapperProps, inputProps } = useController({
    name,
    defaultValue,
    onChange,
    ...rest,
  });
  const handleChange = (results) => {
    field.onChange(results);
    onChange(name, results);
  };

  const uppy = useMemo(
    () =>
      new Uppy({
        ...defaultOptions,
        ...options,
      })
        .use(uploadOptions.module, uploadOptions.options)
        .on('complete', (result) => {
          handleChange(result.successful.map(uploadOptions.responseHandler));
        }),
    [],
  );

  useEffect(() => () => uppy.close({ reason: 'unmount' }), [uppy]);

  return (
    <Wrapper {...wrapperProps}>
      <Dashboard
        {...inputProps}
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
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...moduleOptions}
      />
    </Wrapper>
  );
}

export default FieldFileUploader;
