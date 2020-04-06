import { Wrapper } from '@uidu/field-base';
import Spinner from '@uidu/spinner';
import Uppy from '@uppy/core';
import ThumbnailGenerator from '@uppy/thumbnail-generator';
import XHRUpload from '@uppy/xhr-upload';
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
  defaultValue,
  name,
  value,
  onChange,
  onSetValue,
  XHRUploadOptions = {},
  ...rest
}: FieldImageUploaderProps) {
  const canvas: React.RefObject<HTMLDivElement> = useRef(null);
  const editor: React.RefObject<any> = useRef(null);

  const handleMouseOut = () => setIsHovered(false);
  const handleMouseOver = () => setIsHovered(true);
  const calculateWidth = useCallback(() => canvas.current?.offsetWidth, [
    canvas.current,
  ]);
  const calculateHeight = useCallback(() => canvas.current?.offsetHeight, [
    canvas.current,
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState(defaultValue);
  const [errors, setErrors] = useState([]);
  const [progress, setProgress] = useState(null);

  const uppyInstance = useMemo(() => {
    return Uppy({
      autoProceed: true,
    })
      .use(XHRUpload, XHRUploadOptions)
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
        const value = result.successful.map(
          ({ response: { body } }) => body,
        )[0];
        const valueWithMetadata = mergeValueWithMetadata(value);
        onSetValue(valueWithMetadata);
        onChange(name, valueWithMetadata);
      });
  }, []);

  const uppy = useRef(uppyInstance);

  useEffect(() => {
    const currentUppyInstance = uppy.current;
    return () => currentUppyInstance.close();
  }, []);

  useEffect(() => {
    const currentUppyInstance = uppy.current;
    currentUppyInstance.getPlugin('ThumbnailGenerator').setOptions({
      thumbnailWidth: calculateWidth() * 2, // max scale
    });
    return () => null;
  }, [canvas.current]);

  const handleChange = () => {
    if (value) {
      const valueWithMetadata = mergeValueWithMetadata(value);
      onSetValue(valueWithMetadata);
      onChange(name, valueWithMetadata);
    }
  };

  const mergeValueWithMetadata = (value) => {
    return {
      ...value,
      metadata: {
        ...value.metadata,
        crop: {
          ...position,
          scale,
          width: calculateWidth(),
          height: calculateHeight(),
        },
      },
    };
  };

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
    uppy.current.addFile({
      name: file.name,
      type: file.type,
      data: file,
    });
  };

  const handleScale = (e) => {
    setScale(parseFloat(e.currentTarget.value));
  };

  const handlePositionChange = (coordinates) => {
    setPosition(coordinates);
  };

  const dismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setData([]);
    setScale(1);
    setImageUrl(data.length > 0 ? defaultValue : '');
    // delayedOnChange(data.length > 0 ? defaultValue : '');
  };

  let control = null;

  if (data.length === 0) {
    if (defaultValue) {
      control = (
        <ExistingComponent
          defaultValue={defaultValue}
          borderRadius={borderRadius}
          onDrop={handleDrop}
        >
          <ToolbarComponent
            confirm={handleChange}
            dismiss={dismiss}
            isHovered={isHovered}
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
            confirm={handleChange}
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

// class FieldImageUploader extends PureComponent<FieldImageUploaderProps, any> {

// handleChange = debounce(() => {
//   const { name, onChange, onSetValue, toBase64, defaultValue } = this.props;
//   const { data, imageMime } = this.state;
// if (data.length === 0) {
//   onSetValue(defaultValue);
//   return onChange(name, defaultValue);
// }

// const canvas = this.editor.current.getImage();

// if (toBase64) {
//   onSetValue(canvas.toDataURL(imageMime));
//   return onChange(name, canvas.toDataURL(imageMime));
// }

// return canvas.toBlob(blob => {
//   onSetValue(blob);
//   onChange(name, blob);
// }, imageMime);
// }, 300);
// }

export default FieldImageUploader;
