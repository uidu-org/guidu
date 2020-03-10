import Spinner from '@uidu/spinner';
import loadImage from 'blueimp-load-image';
import debounce from 'lodash/debounce';
import React, { PureComponent } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import { FieldImageUploaderProps } from '../types';
import Empty from './Empty';
import Existing from './Existing';
import Toolbar from './Toolbar';

class FieldImageUploader extends PureComponent<FieldImageUploaderProps, any> {
  canvas: React.RefObject<HTMLDivElement> = React.createRef();
  editor: React.RefObject<any> = React.createRef();

  static defaultProps = {
    toolbar: Toolbar,
    existing: Existing,
    empty: Empty,
    toBase64: true,
    borderRadius: 0,
    max: 20000000, // 20 MB
    ratio: '16by9',
    dropzoneProps: {
      multiple: false,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      scale: 1,
      imageUrl: props.value,
      imageName: null,
      imageMime: null,
      errors: [],
      isHovered: false,
    };
  }

  handleChange = debounce(() => {
    const { name, onChange, onSetValue, toBase64, defaultValue } = this.props;
    const { data, imageMime } = this.state;
    if (data.length === 0) {
      onSetValue(defaultValue);
      return onChange(name, defaultValue);
    }

    const canvas = this.editor.current.getImage();

    if (toBase64) {
      onSetValue(canvas.toDataURL(imageMime));
      return onChange(name, canvas.toDataURL(imageMime));
    }

    return canvas.toBlob(blob => {
      onSetValue(blob);
      onChange(name, blob);
    }, imageMime);
  }, 300);

  handleMouseOut = () => this.setState({ isHovered: false });
  handleMouseOver = () => this.setState({ isHovered: true });

  handleDrop = files => {
    console.log(files);
    this.setState(
      {
        loading: true,
      },
      () => {
        const validationResults = this.validate(files[0]);
        if (validationResults.isValid) {
          return this.evaluate(files[0]);
        }
        this.setState({
          loading: false,
          errors: validationResults.errors,
        });
      },
    );
  };

  validate = file => {
    const { max } = this.props;
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

  evaluate = file => {
    console.log(file);
    return loadImage.parseMetaData(file, data => {
      let orientation = 0;
      if (data.exif) {
        orientation = data.exif.get('Orientation');
      }

      loadImage(
        file,
        canvas => {
          const image = new Image();
          console.log(image);
          image.onload = () => {
            this.setState({
              imageName: file.name,
              imageMime: file.type,
              imageUrl: image.src,
              scale: 1,
              data: [file],
              loading: false,
              errors: [],
            });
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

  handleScale = e => {
    this.setState({ scale: parseFloat(e.currentTarget.value) }, () => {
      this.handleChange();
    });
  };

  dismiss = e => {
    const { defaultValue } = this.props;
    const { data } = this.state;
    e.preventDefault();
    e.stopPropagation();
    this.setState(
      {
        data: [],
        scale: 1,
        imageUrl: data.length > 0 ? defaultValue : '',
      },
      () => {
        this.handleChange();
      },
    );
  };

  calculateWidth = () => this.canvas.current.offsetWidth;
  calculateHeight = () => this.canvas.current.offsetHeight;

  render() {
    const {
      borderRadius,
      defaultValue,
      ratio,
      existing: ExistingComponent,
      empty: EmptyComponent,
      toolbar: ToolbarComponent,
      dropzoneProps,
    } = this.props;
    const { data, imageUrl, loading, scale, errors, isHovered } = this.state;
    let control = null;

    console.log(this.props);
    console.log(this.state);

    if (data.length === 0) {
      control = (
        <Dropzone onDrop={this.handleDrop} {...dropzoneProps}>
          {({ getRootProps, getInputProps }) => {
            if (defaultValue) {
              return (
                <ExistingComponent
                  getRootProps={getRootProps}
                  getInputProps={getInputProps}
                  defaultValue={defaultValue}
                  borderRadius={borderRadius}
                  handleDrop={this.handleDrop}
                >
                  <ToolbarComponent
                    dismiss={this.dismiss}
                    isHovered={isHovered}
                  />
                </ExistingComponent>
              );
            }

            return (
              <EmptyComponent
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                loading={loading}
                errors={errors}
                borderRadius={borderRadius}
                handleDrop={this.handleDrop}
              />
            );
          }}
        </Dropzone>
      );
    } else {
      control = (
        <div className="image-uploader h-100">
          <>
            <AvatarEditor
              ref={this.editor}
              image={imageUrl}
              width={this.calculateWidth()}
              height={this.calculateHeight()}
              border={0}
              borderRadius={borderRadius}
              color={[0, 0, 0, 0.6]} // RGBA
              scale={scale}
              onLoadSuccess={this.handleChange}
              onPositionChange={this.handleChange}
            />
            <ToolbarComponent
              handleScale={this.handleScale}
              dismiss={this.dismiss}
              isHovered={isHovered}
            />
          </>
        </div>
      );
    }

    return (
      <div
        className={`embed-responsive embed-responsive-${ratio} card`}
        style={{ borderRadius }}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        <div className="embed-responsive-item" ref={this.canvas}>
          {loading ? <Spinner /> : control}
        </div>
      </div>
    );
  }
}

export default FieldImageUploader;
