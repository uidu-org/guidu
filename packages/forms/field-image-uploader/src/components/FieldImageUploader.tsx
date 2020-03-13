import { Wrapper } from '@uidu/field-base';
import Spinner from '@uidu/spinner';
import loadImage from 'blueimp-load-image';
import debounce from 'lodash.debounce';
import React, { useCallback, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { FieldImageUploaderProps } from '../types';
import Empty from './Empty';
import Existing from './Existing';
import Prompt from './Prompt';
import Toolbar from './Toolbar';

function FieldImageUploader({
  toolbar: ToolbarComponent = Toolbar,
  existing: ExistingComponent = Existing,
  empty: EmptyComponent = Empty,
  prompt: PromptComponent = Prompt,
  label,
  help,
  toBase64 = false,
  borderRadius = 0,
  max = 20000000, // 20 MB
  ratio = '16by9',
  dropzoneProps = {
    multiple: false,
  },
  defaultValue,
  name,
  onChange,
  onSetValue,
  ...rest
}: FieldImageUploaderProps) {
  const canvas: React.RefObject<HTMLDivElement> = useRef(null);
  const editor: React.RefObject<any> = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [scale, setScale] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState(defaultValue);
  const [errors, setErrors] = useState([]);
  const [imageMime, setImageMime] = useState(null);
  const [imageName, setImageName] = useState(null);

  const handleMouseOut = () => setIsHovered(false);
  const handleMouseOver = () => setIsHovered(true);
  const calculateWidth = () => canvas.current.offsetWidth;
  const calculateHeight = () => canvas.current.offsetHeight;

  const handleChange = _data => {
    if (editor.current) {
      const canvas = editor.current.getImage();
      if (toBase64) {
        const value = canvas.toDataURL(imageMime);
        onSetValue(value);
        onChange(name, value);
      } else {
        canvas.toBlob(blob => {
          onSetValue(blob);
          onChange(name, blob);
        }, imageMime);
      }
    } else {
      onSetValue(defaultValue);
      onChange(name, defaultValue);
    }
  };

  const delayedOnChange = useCallback(debounce(handleChange, 300), []);

  const handleDrop = files => {
    setIsLoading(true);
    const validationResults = validate(files[0]);
    if (validationResults.isValid) {
      evaluate(files[0]);
    } else {
      setIsLoading(false);
      setErrors(validationResults.errors);
    }
  };

  const validate = file => {
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

  const evaluate = async file => {
    return loadImage.parseMetaData(file, data => {
      let orientation = 0;
      if (data.exif) {
        orientation = data.exif.get('Orientation');
      }

      loadImage(
        file,
        canvas => {
          const image = new Image();
          image.onload = () => {
            setIsLoading(false);
            setImageUrl(image.src);
            setImageMime(file.type);
            setImageName(file.name);
            setScale(1);
            setData([file]);
            setErrors([]);
          };
          image.src = canvas.toDataURL();
        },
        {
          orientation,
          canvas: true,
          noRevoke: true,
        },
      );
    });
  };

  const handleScale = e => {
    setScale(parseFloat(e.currentTarget.value));
    delayedOnChange(e.currentTarget.value);
  };

  const dismiss = e => {
    e.preventDefault();
    e.stopPropagation();
    setData([]);
    setScale(1);
    setImageUrl(data.length > 0 ? defaultValue : '');
    delayedOnChange(data.length > 0 ? defaultValue : '');
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
            confirm={delayedOnChange}
            dismiss={dismiss}
            isHovered={isHovered}
          />
        </ExistingComponent>
      );
    }
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
            onLoadSuccess={delayedOnChange}
            onPositionChange={delayedOnChange}
          />
          <ToolbarComponent
            handleScale={handleScale}
            confirm={delayedOnChange}
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
