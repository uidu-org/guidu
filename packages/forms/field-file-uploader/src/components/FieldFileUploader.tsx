/* eslint-disable react/jsx-props-no-spreading */
import { noop, useController, Wrapper } from '@uidu/field-base';
import { useFormContext } from '@uidu/form';
import {
  FileIdentifier,
  uppyRestrictionsToDropzoneProps,
} from '@uidu/media-core';
import Uppy, { UppyOptions } from '@uppy/core';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { useDropzone } from 'react-dropzone';
import { StyledRoot } from '../styled';
import { FieldFileUploaderProps } from '../types';
import DefaultFileList from './FileList';
import DefaultPrompt from './Prompt';

const defaultOptions = {
  debug: process.env.NODE_ENV === 'development',
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
  onChange = noop,
  name,
  value: defaultValue = '',
  rules = {},
  options = {},
  uploadOptions,
  className,
  prompt: Prompt = DefaultPrompt,
  fileList: FileList = DefaultFileList,
  onFileAdded = noop,
  onFileRemoved = noop,
  onUploadError = noop,
  onUploadComplete = noop,
  forwardedRef,
  ...rest
}: FieldFileUploaderProps) {
  const { setError, clearErrors } = useFormContext();
  const { field, wrapperProps, inputProps, fieldState } = useController({
    name,
    defaultValue,
    onChange,
    rules,
    ...rest,
  });

  const mergeOptions: UppyOptions = useMemo(
    () => ({
      ...defaultOptions,
      ...options,
    }),
    [options],
  );

  const { onChange: onFieldChange } = field;

  const handleChange = useCallback(
    (results: FileIdentifier | FileIdentifier[]) => {
      onFieldChange(results);
      onChange(name, results);
    },
    [onChange, name, onFieldChange],
  );

  const [uppy] = useState(() =>
    new Uppy(mergeOptions).use(uploadOptions.module, uploadOptions.options),
  );

  uppy
    .on('file-added', (file) => {
      onFileAdded(file);
      clearErrors(name);
    })
    .on('complete', (result) => {
      onUploadComplete(result);
      if (result.failed.length > 0) {
        setError(name, { type: 'custom', message: result.failed[0].error });
      } else if (mergeOptions.restrictions?.maxNumberOfFiles === 1) {
        handleChange(result.successful.map(uploadOptions.responseHandler)[0]);
      } else {
        handleChange(result.successful.map(uploadOptions.responseHandler));
      }
    })
    .on('error', (error) => {
      setError(name, { type: 'custom', message: error.message });
    })
    .on('upload-error', (file, error) => {
      onUploadError(file, error);
      setError(name, { type: 'custom', message: error.message });
    })
    .on('file-removed', (file, reason) => {
      onFileRemoved(file, reason);
      onFieldChange(uppy.getFiles().map(uploadOptions.responseHandler));
      onChange(name, uppy.getFiles().map(uploadOptions.responseHandler));
    })
    .on('restriction-failed', (_file, error) => {
      setError(name, { type: 'custom', message: error.message });
    });

  useImperativeHandle(forwardedRef, () => uppy, [uppy]);

  const evaluate = (file: File) => {
    uppy.addFile({
      name: file.name,
      type: file.type,
      data: file,
    });
  };

  const onDrop = (files: File[]) => {
    files.forEach((file) => {
      try {
        evaluate(file);
      } catch (error) {
        setError(name, { type: 'custom', message: error.message });
      }
    });

    // setIsLoading(true);
    // const validationResults = validate(files[0]);
    // if (validationResults.isValid) {
    //   evaluate(files[0]);
    // } else {
    //   setIsLoading(false);
    //   setErrors(validationResults.errors);
    // }
  };

  const uppyRestrictionsToDropZone = useMemo(
    () =>
      uppyRestrictionsToDropzoneProps({
        restrictions: mergeOptions.restrictions,
      }),
    [mergeOptions.restrictions],
  );

  const {
    getRootProps,
    getInputProps,
    open,
    rootRef,
    isDragActive,
    isDragAccept,
    isFocused,
    isFileDialogActive,
    isDragReject,
  } = useDropzone({
    onDrop,
    ...uppyRestrictionsToDropZone,
  });

  useEffect(() => {
    if (rootRef.current) {
      field.ref(rootRef.current);
    }
  }, [field, rootRef]);

  return (
    <Wrapper {...wrapperProps} floatLabel={false} errorIcon={() => null}>
      <StyledRoot
        {...getRootProps({
          onBlur: field.onBlur,
        })}
        className={className}
        $hasError={!!fieldState.error}
        $isDragActive={isDragActive}
        $isDragAccept={isDragAccept}
        $isFocused={isFocused}
        $isFileDialogActive={isFileDialogActive}
        $isDragReject={isDragReject}
      >
        <input {...getInputProps({ id: inputProps.id })} />
        <Prompt open={open} {...wrapperProps} />
      </StyledRoot>
      <FileList uppy={uppy} />
    </Wrapper>
  );
}

export default forwardRef((props, ref) => (
  <FieldFileUploader forwardedRef={ref} {...props} />
));
