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
import Empty from './Empty';
import Existing from './Existing';
import Progress from './Progress';
import Prompt from './Prompt';
import Toolbar from './Toolbar';

export function debounce(func: Function, timeout?: number) {
  let timer: number | undefined;
  return (...args: any[]) => {
    const next = () => func(...args);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(next, timeout > 0 ? timeout : 300);
  };
}

function FieldImageUploader({
  toolbar: ToolbarComponent = Toolbar,
  existing: ExistingComponent = Existing,
  empty: EmptyComponent = Empty,
  prompt: PromptComponent = Prompt,
  progress: ProgressComponent = Progress,
  label,
  help,
  borderRadius = 0,
  max = 20000000, // 20 MB
  ratio = '16by9',
  dropzoneProps = {
    multiple: false,
  },
  name,
  defaultImageUrl,
  value,
  onChange,
  onSetValue,
  uploadOptions,
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
    return Uppy({
      autoProceed: true,
      restrictions: {
        maxNumberOfFiles: 1,
      },
    })
      .use(uploadOptions.module, uploadOptions.options)
      .use(ThumbnailGenerator, {
        thumbnailWidth: calculateWidth(),
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

  const handleScale = (e) => {
    setScale(parseFloat(e.currentTarget.value));
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

  if (data.length === 0) {
    if (value) {
      control = (
        <ExistingComponent
          value={imageUrl}
          borderRadius={borderRadius}
          onDrop={handleDrop}
        >
          <ToolbarComponent
            dismiss={destroy}
            isHovered={isHovered}
            label="Edit image"
          />
        </ExistingComponent>
      );
    } else {
      control = (
        <EmptyComponent
          loading={isLoading}
          errors={errors}
          borderRadius={borderRadius}
          onDrop={handleDrop}
          label={label}
          help={help}
          prompt={PromptComponent}
        />
      );
    }
  } else {
    control = (
      <div className="image-uploader h-100">
        <>
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
          <ToolbarComponent
            handleScale={handleScale}
            dismiss={dismiss}
            isHovered={isHovered}
          />
        </>
      </div>
    );
  }

  return (
    <Wrapper label={label} {...rest}>
      <div
        className={`embed-responsive embed-responsive-${ratio} card`}
        style={{ borderRadius }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div className="embed-responsive-item" ref={canvas}>
          <ProgressComponent progress={progress} />
          {isLoading ? <Spinner /> : control}
        </div>
      </div>
    </Wrapper>
  );
}

export default FieldImageUploader;
