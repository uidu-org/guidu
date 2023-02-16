import { noop, useController, Wrapper } from '@uidu/field-base';
import { useFormContext } from '@uidu/form';
import { FileIdentifier } from '@uidu/media-core';
import Spinner from '@uidu/spinner';
import Uppy, { UppyOptions } from '@uppy/core';
import ThumbnailGenerator from '@uppy/thumbnail-generator';
import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import AvatarEditor from 'react-avatar-editor';
import { FieldImageUploaderProps } from '../types';
import Container from './Container';
import Empty from './Empty';
import Existing from './Existing';
import Progress from './Progress';
import Prompt from './Prompt';
import Toolbar from './Toolbar';

export function debounce(func: Function, timeout?: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    const next = () => func(...args);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(next, timeout > 0 ? timeout : 300);
  };
}

const defaultOptions: Partial<UppyOptions> = {
  autoProceed: true,
  restrictions: {
    maxNumberOfFiles: 1,
    allowedFileTypes: ['.png', '.jpg', '.jpeg'],
  },
};

function FieldImageUploaderStateless({
  toolbar: ToolbarComponent = Toolbar,
  existing: ExistingComponent = Existing,
  empty: EmptyComponent = Empty,
  prompt: PromptComponent = Prompt,
  progress: ProgressComponent = Progress,
  // container: ContainerComponent = Container,
  label,
  help,
  borderRadius = 0,
  max = 20000000, // 20 MB
  // dropzoneProps = {
  //   multiple: false,
  // },
  name,
  defaultImageUrl,
  value: defaultValue = '',
  rules,
  onChange = noop,
  uploadOptions,
  className,
  options,
  ...rest
}: FieldImageUploaderProps) {
  const { setError, clearErrors } = useFormContext();
  const { field, wrapperProps } = useController({
    name,
    defaultValue,
    onChange,
    rules,
    ...rest,
  });

  const canvas = useRef<HTMLDivElement>(null);
  const editor = useRef<AvatarEditor>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [scale, setScale] = useState(1);
  const [crop, setCrop] = useState<FileIdentifier['metadata']['crop']>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);
  const [errors, setErrors] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleMouseOut = () => setIsHovered(false);
  const handleMouseOver = () => setIsHovered(true);

  const calculateWidth = useCallback(() => canvas.current?.offsetWidth, []);
  const calculateHeight = useCallback(() => canvas.current?.offsetHeight, []);

  const [value, setValue] = useState<FileIdentifier>(field.value);

  const mergeOptions: UppyOptions = useMemo(
    () => ({
      ...defaultOptions,
      ...options,
    }),
    [options],
  );

  const uppy = useMemo(
    () =>
      new Uppy(mergeOptions).use(uploadOptions.module, uploadOptions.options),
    [uploadOptions, mergeOptions],
  );

  uppy
    .on('file-added', () => {
      clearErrors(name);
    })
    .use(ThumbnailGenerator, {
      thumbnailWidth: calculateWidth(),
      thumbnailType: 'image/png',
    })
    .on('thumbnail:generated', (file, preview) => {
      setIsLoading(false);
      setScale(1);
      setImageUrl(preview);
      setData([file]);
      setErrors([]);
    })
    .on('upload', () => setProgress(0))
    .on('upload-progress', (_file, prgrss) => {
      setProgress(prgrss.bytesUploaded / prgrss.bytesTotal);
    })

    .on('complete', (result) => {
      setIsLoading(false);
      setProgress(null);
      console.log(result);
      if (result.failed.length > 0) {
        setError(name, { type: 'custom', message: result.failed[0].error });
      } else {
        const response = result.successful.map(
          uploadOptions.responseHandler,
        )[0];
        setValue(response);
        field.onChange(response);
        onChange(name, response);
      }
    })
    .on('error', (error) => {
      setIsLoading(false);
      setError(name, { type: 'custom', message: error.message });
    })
    .on('upload-error', (_file, error) => {
      setIsLoading(false);
      setError(name, { type: 'custom', message: error.message });
    })
    .on('file-removed', () => {
      field.onChange('');
      onChange(name, '');
    })
    .on('restriction-failed', (_file, error) => {
      setIsLoading(false);
      setError(name, { type: 'custom', message: error.message });
    });

  const thumbnailPlugin = useMemo(
    () => uppy.getPlugin('ThumbnailGenerator'),
    [uppy],
  );

  useEffect(() => {
    thumbnailPlugin?.setOptions({
      thumbnailWidth: calculateWidth() * 2, // max scale
    });
  }, [calculateWidth, thumbnailPlugin]);

  const mergeValueWithMetadata = useCallback(() => {
    if (value) {
      return {
        ...value,
        metadata: {
          ...value.metadata,
          crop,
        },
      };
    }
    return value;
  }, [crop, value]);

  const validate = (file: File) => {
    if (file.size < max) {
      return {
        isValid: true,
      };
    }
    return {
      isValid: false,
      errors: ['maxFileSize'],
    };
  };

  const evaluate = (file: File) => {
    uppy.addFile({
      name: file.name,
      type: file.type,
      data: file,
    });
  };

  const handleDrop = (files: File[]) => {
    setIsLoading(true);
    const validationResults = validate(files[0]);
    if (validationResults.isValid) {
      evaluate(files[0]);
    } else {
      setIsLoading(false);
      setErrors(validationResults.errors);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChange = useCallback(
    debounce((v) => {
      onChange(name, v);
      field.onChange(v);
    }, 300),
    [name, field.onChange, onChange],
  );

  useEffect(() => {
    debouncedChange(value);
  }, [value, debouncedChange]);

  const handleScale = (newScale: number) => {
    setScale(newScale);
    setCrop(editor.current?.getCroppingRect());
    setValue(mergeValueWithMetadata());
  };

  const handlePositionChange = () => {
    setCrop(editor.current?.getCroppingRect());
    setValue(mergeValueWithMetadata);
  };

  const dismiss = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    uppy.cancelAll();
    setIsLoading(false);
    setData([]);
    setScale(1);
    field.onChange(defaultValue || null);
    onChange(name, defaultValue || null);
    setImageUrl(defaultImageUrl);
  };

  const destroy = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    field.onChange(null);
    onChange(name, null);
    setImageUrl(null);
  };

  let control = null;
  let toolbar = null;

  if (data.length === 0) {
    if (field.value) {
      toolbar = (
        <ToolbarComponent
          scale={scale}
          dismiss={destroy}
          isHovered={isHovered}
        />
      );
      control = (
        <ExistingComponent
          value={imageUrl}
          borderRadius={borderRadius}
          onDrop={handleDrop}
          isHovered={isHovered}
          restrictions={mergeOptions.restrictions}
        />
      );
    } else {
      control = (
        <EmptyComponent
          errors={errors}
          borderRadius={borderRadius}
          onDrop={handleDrop}
          label={label}
          help={help}
          prompt={PromptComponent}
          isHovered={isHovered}
          restrictions={mergeOptions.restrictions}
        />
      );
    }
  } else {
    toolbar = (
      <ToolbarComponent
        scale={scale}
        handleScale={handleScale}
        dismiss={dismiss}
        isHovered={isHovered}
      />
    );
    control = (
      <AvatarEditor
        ref={editor}
        image={imageUrl}
        width={calculateWidth()}
        height={calculateHeight()}
        border={0}
        borderRadius={borderRadius}
        color={[0, 0, 0, 0.6]} // RGBA
        scale={scale}
        onPositionChange={handlePositionChange}
      />
    );
  }

  return (
    <Wrapper
      label={label}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...wrapperProps}
      errorIcon={() => null}
    >
      <div
        tabIndex={0}
        role="button"
        tw="relative"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onFocus={handleMouseOver}
        ref={field.ref}
        onBlur={() => {
          field.onBlur();
          handleMouseOut();
        }}
      >
        <Container
          borderRadius={borderRadius}
          ref={canvas}
          className={className}
        >
          {isLoading ? (
            <div tw="h-full w-full flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            control
          )}
        </Container>
        {toolbar}
        <ProgressComponent progress={progress} />
      </div>
    </Wrapper>
  );
}

export default FieldImageUploaderStateless;
