import { StyledInput, useController, Wrapper } from '@uidu/field-base';
import { useFormContext } from '@uidu/form';
import { FileIdentifier } from '@uidu/media-core';
import Uppy, { UppyOptions } from '@uppy/core';
import '@uppy/core/dist/style.css';
// import '@uppy/dashboard/dist/style.css';
import { useUppy } from '@uppy/react';
import React, { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import { FieldFileUploaderProps } from '../types';

const defaultOptions = {
  debug: process.env.NODE_ENV === 'development',
  allowMultipleUploadBatches: true,
  restrictions: {
    maxNumberOfFiles: 1,
    minNumberOfFiles: null,
    maxFileSize: null,
    allowedFileTypes: null,
  },
  autoProceed: true,
};

function FieldFileUploader({
  onChange = () => {},
  name,
  value: defaultValue = '',
  options = {},
  uploadOptions,
  ...rest
}: FieldFileUploaderProps) {
  const { setError, clearErrors } = useFormContext();
  const { field, wrapperProps, inputProps } = useController({
    name,
    defaultValue: '',
    onChange,
    ...rest,
  });
  const handleChange = useCallback(
    (results: FileIdentifier | FileIdentifier[]) => {
      field.onChange(results);
      onChange(name, results);
    },
    [onChange, name, field],
  );

  const mergeOptions: UppyOptions = useMemo(
    () => ({
      ...defaultOptions,
      ...options,
    }),
    [options],
  );

  const uppy = useUppy(() =>
    new Uppy(mergeOptions)
      .use(uploadOptions.module, uploadOptions.options)
      .on('file-added', () => {
        clearErrors(name);
      })
      .on('complete', (result) => {
        if (result.failed.length > 0) {
          setError(name, { type: 'custom', message: result.failed[0].error });
        } else {
          if (mergeOptions.restrictions?.maxNumberOfFiles === 1) {
            handleChange(
              result.successful.map(uploadOptions.responseHandler)[0],
            );
          } else {
            handleChange(result.successful.map(uploadOptions.responseHandler));
          }
        }
      })
      .on('error', (error) => {
        setError(name, { type: 'custom', message: error.message });
      })
      .on('upload-error', (file, error) => {
        setError(name, { type: 'custom', message: error.message });
      })
      .on('file-removed', (file) => {
        field.onChange('');
        onChange(name, '');
      })
      .on('restriction-failed', (file, error) => {
        setError(name, { type: 'custom', message: error.message });
      }),
  );

  useEffect(() => () => uppy.close(), [uppy]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      try {
        uppy.addFile({
          source: 'file input',
          name: file.name,
          type: file.type,
          data: file,
        });
      } catch (error) {
        setError(name, { type: 'custom', message: error.message });
      }
    });
  };

  return (
    <Wrapper {...wrapperProps} floatLabel={false}>
      <StyledInput {...inputProps} type="file" onChange={onInputChange} />

      {/* <Dashboard
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
      /> */}
    </Wrapper>
  );
}

export default FieldFileUploader;
