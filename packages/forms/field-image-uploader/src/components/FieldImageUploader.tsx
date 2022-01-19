import { Wrapper } from '@uidu/field-base';
import Spinner from '@uidu/spinner';
import Uppy from '@uppy/core';
import ThumbnailGenerator from '@uppy/thumbnail-generator';
import React, {
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

function FieldImageUploaderStateless({
  toolbar: ToolbarComponent = Toolbar,
  existing: ExistingComponent = Existing,
  empty: EmptyComponent = Empty,
  prompt: PromptComponent = Prompt,
  progress: ProgressComponent = Progress,
  container: ContainerComponent = Container,
  label,
  help,
  borderRadius = 0,
  max = 20000000, // 20 MB
  dropzoneProps = {
    multiple: false,
  },
  name,
  defaultImageUrl,
  value,
  onChange,
  onSetValue,
  uploadOptions,
  className,
  ...rest
}: FieldImageUploaderProps) {
  const canvas: React.RefObject<HTMLDivElement> = useRef(null);
  const editor: React.RefObject<AvatarEditor> = useRef(null);
  const defaultValue = useRef(value);

  const handleMouseOut = () => setIsHovered(false);
  const handleMouseOver = () => setIsHovered(true);
  const calculateWidth = useCallback(() => canvas.current?.offsetWidth, []);
  const calculateHeight = useCallback(() => canvas.current?.offsetHeight, []);

  const [controlledValue, setControlledValue] = useState(value);

  const [isLoading, setIsLoading] = useState(false);
  const [scale, setScale] = useState(1);
  const [crop, setCrop] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);
  const [errors, setErrors] = useState([]);
  const [progress, setProgress] = useState(null);

  const uppy = useMemo(() => {
    return new Uppy({
      autoProceed: true,
      restrictions: {
        maxNumberOfFiles: 1,
      },
    })
      .use(uploadOptions.module, uploadOptions.options)
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
      .on('upload-progress', (_file, progress) => {
        setProgress(progress.bytesUploaded / progress.bytesTotal);
      })

      .on('complete', (result) => {
        setProgress(null);
        const response = result.successful.map(
          uploadOptions.responseHandler,
        )[0];
        setControlledValue(response);
        onSetValue(response);
        onChange(name, response);
      });
  }, [
    calculateWidth,
    name,
    onChange,
    onSetValue,
    uploadOptions.module,
    uploadOptions.responseHandler,
    uploadOptions.options,
  ]);

  useEffect(() => {
    return () => uppy.close();
  }, [uppy]);

  useEffect(() => {
    uppy.getPlugin('ThumbnailGenerator').setOptions({
      thumbnailWidth: calculateWidth() * 2, // max scale
    });
    return () => null;
  }, [uppy, calculateWidth]);

  const mergeValueWithMetadata = useCallback(() => {
    if (controlledValue) {
      return {
        ...controlledValue,
        metadata: {
          ...controlledValue.metadata,
          crop,
        },
      };
    }
  }, [crop, controlledValue]);

  const handleDrop = (files) => {
    setIsLoading(true);
    const validationResults = validate(files[0]);
    if (validationResults.isValid) {
      evaluate(files[0]);
    } else {
      setIsLoading(false);
      setErrors(validationResults.errors);
    }
  };

  const validate = (file) => {
    const errors = [];
    if (file.size < max) {
      return {
        isValid: true,
      };
    } else {
      errors.push('maxFileSize');
    }
    return {
      isValid: false,
      errors,
    };
  };

  const evaluate = async (file: File) => {
    uppy.addFile({
      name: file.name,
      type: file.type,
      data: file,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChange = useCallback(
    debounce((v) => {
      onChange(name, v);
      onSetValue(v);
    }, 300),
    [name, onSetValue, onChange],
  );

  useEffect(() => {
    debouncedChange(controlledValue);
  }, [controlledValue, debouncedChange]);

  const handleScale = (newScale: number) => {
    setScale(newScale);
    setCrop(editor.current?.getCroppingRect());
    setControlledValue(mergeValueWithMetadata());
  };

  const handlePositionChange = () => {
    setCrop(editor.current?.getCroppingRect());
    setControlledValue(mergeValueWithMetadata);
  };

  const dismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uppy.reset();
    setIsLoading(false);
    setData([]);
    setScale(1);
    onSetValue(defaultValue.current || null);
    onChange(name, defaultValue.current || null);
    setImageUrl(defaultImageUrl);
  };

  const destroy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSetValue(null);
    onChange(name, null);
    setImageUrl(null);
  };

  let control = null;
  let toolbar = null;

  if (data.length === 0) {
    if (value) {
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
    <Wrapper label={label} {...rest}>
      <div
        tw="relative"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
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
