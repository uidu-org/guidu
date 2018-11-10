import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AvatarEditor from 'react-avatar-editor';
import loadImage from 'blueimp-load-image';
import debounce from 'lodash/debounce';
import { Camera, Plus, Minus, Trash } from 'react-feather';
import Loader from '@uidu/loader';
import ComponentCommon from './component-common';

export default class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.debouncedChange = debounce(this.handleChange, 300);
    this.state = {
      loading: false,
      data: [],
      scale: 1,
      imageUrl: props.value,
      imageName: null,
      imageMime: null,
    };
  }

  getId = () => {
    const { id, name } = this.props;
    return id || [name, Math.floor(Date.now() / 1000)].join('_');
  };

  handleChange = () => {
    const { name, onChange, onSetValue, toBase64, defaultValue } = this.props;
    const { data, imageMime } = this.state;
    if (data.length === 0) {
      onSetValue(defaultValue);
      return onChange(name, defaultValue);
    }

    const canvas = this.editor.getImage();

    if (toBase64) {
      onSetValue(canvas.toDataURL(imageMime));
      return onChange(name, canvas.toDataURL(imageMime));
    }

    return canvas.toBlob(blob => {
      onSetValue(blob);
      onChange(name, blob);
    }, imageMime);
  };

  add = e => {
    const { max, onMaxFileSizeReached } = this.props;
    e.persist();
    this.setState(
      {
        loading: true,
      },
      () => {
        const { files } = e.dataTransfer || e.target;
        if (files[0].size < max) {
          return loadImage.parseMetaData(files[0], data => {
            let orientation = 0;
            if (data.exif) {
              orientation = data.exif.get('Orientation');
            }

            loadImage(
              files[0],
              canvas => {
                const image = new Image();
                image.onload = () => {
                  this.setState({
                    imageName: files[0].name,
                    imageMime: files[0].type,
                    imageUrl: image.src,
                    scale: 1,
                    data: files,
                    loading: false,
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
        }

        if (onMaxFileSizeReached) {
          return onMaxFileSizeReached();
        }

        return window.alert(
          window.I18n.t(
            'activerecord.errors.models.collection.attributes.image.size',
            { max: max / 1000000 },
          ),
        );
      },
    );
  };

  handleScale = e => {
    this.setState({ scale: parseFloat(e.currentTarget.value) });
    this.debouncedChange();
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

  calculateWidth = () => this.canvas.offsetWidth;

  calculateHeight = () => this.canvas.offsetHeight;

  renderInput = (id, onChange) => {
    const { renderInput, name } = this.props;
    if (renderInput) {
      return renderInput(id, onChange);
    }
    return (
      <input
        accept="image/png, image/jpeg, image/gif"
        type="file"
        id={`file-input-${id}`}
        name={name}
        onChange={onChange}
        hidden
      />
    );
  };

  renderToolbar = () => {
    const { renderToolbar } = this.props;
    const { data } = this.state;
    if (renderToolbar) {
      return renderToolbar({
        state: this.state,
        handleScale: this.handleScale,
        getId: this.getId,
        dismiss: this.dismiss,
        add: this.add,
        renderInput: this.renderInput,
      });
    }

    return (
      <div className="image-uploader-actions">
        {data.length > 0 && (
          <div className="range d-flex align-items-center">
            <Minus />
            <input
              className="custom-range mx-3"
              name="scale"
              type="range"
              onChange={this.handleScale}
              min="1"
              max="2"
              step="0.01"
              defaultValue="1"
            />
            <Plus />
          </div>
        )}
        <div className="d-flex align-items-center">
          <a
            tabIndex={0}
            className="text-white mr-4 d-flex align-self-center"
            role="button"
            onClick={this.dismiss}
          >
            <Trash size={16} />
          </a>
          <label className="mb-0" htmlFor={`file-input-${this.getId()}`}>
            {this.renderInput(this.getId(), this.add)}
            Carica immagine
          </label>
        </div>
      </div>
    );
  };

  renderExisting = () => {
    const {
      defaultValue,
      renderExisting,
      className,
      cropClassName,
      borderRadius,
    } = this.props;
    const { loading } = this.state;
    let existingImage = null;
    if (renderExisting) {
      existingImage = renderExisting(defaultValue);
    } else {
      existingImage = (
        <img
          alt={defaultValue}
          className={className}
          style={{
            width: '100%',
            height: '100%',
          }}
          src={defaultValue}
        />
      );
    }
    return (
      <div
        className="image-uploader h-100"
        style={{
          borderRadius,
        }}
      >
        <div
          className={classNames(
            'crop d-flex align-items-center justify-content-center h-100',
            cropClassName,
          )}
        >
          {loading ? (
            <Loader name="three-bounce" color="#666" />
          ) : (
            <label className="mb-0" htmlFor={`file-input-${this.getId()}`}>
              {existingImage}
              {this.renderInput(this.getId(), this.add)}
            </label>
          )}
        </div>
        {this.renderToolbar(this.state)}
      </div>
    );
  };

  renderEmpty = () => {
    const {
      renderEmpty,
      borderRadius,
      cropClassName,
      label,
      help,
    } = this.props;
    const { loading } = this.state;
    let emptyLabel = null;
    if (renderEmpty) {
      emptyLabel = renderEmpty(this.state);
    } else {
      emptyLabel = (
        <div className="text-center">
          <Camera size={64} strokeWidth={1} />
          <br />
          {label}
          <br />
          <small className="text-muted">{help}</small>
        </div>
      );
    }
    return (
      <div className="image-uploader h-100">
        <div
          className={classNames(
            'crop d-flex align-items-center justify-content-center h-100',
            cropClassName,
          )}
          style={{
            borderRadius,
          }}
        >
          {loading ? (
            <Loader name="three-bounce" color="#666" />
          ) : (
            <label className="mb-0" htmlFor={`file-input-${this.getId()}`}>
              {emptyLabel}
              {this.renderInput(this.getId(), this.add)}
            </label>
          )}
        </div>
      </div>
    );
  };

  render() {
    const { borderRadius, defaultValue } = this.props;
    const { data, imageUrl, loading, scale } = this.state;
    let control = null;

    if (data.length === 0) {
      if (defaultValue) {
        control = this.renderExisting();
      } else {
        control = this.renderEmpty();
      }
    } else {
      control = (
        <div className="image-uploader h-100">
          {loading ? (
            <Loader name="three-bounce" color="#666" />
          ) : (
            <div>
              <AvatarEditor
                ref={c => {
                  this.editor = c;
                }}
                image={imageUrl}
                width={this.calculateWidth()}
                height={this.calculateHeight()}
                border={0}
                borderRadius={borderRadius}
                color={[0, 0, 0, 0.6]} // RGBA
                scale={scale}
                onImageReady={this.handleChange}
                onMouseUp={this.handleChange}
              />
              {this.renderToolbar(this.state)}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        className="embed-responsive-item"
        ref={c => {
          this.canvas = c;
        }}
      >
        {control}
      </div>
    );
  }
}

ImageUploader.defaultProps = {
  ...ComponentCommon.defaultProps,
  toBase64: true,
  borderRadius: 0,
  max: 20000000, // 20 MB
  cropClassName: 'null',
  renderExisting: null,
  renderEmpty: null,
  renderToolbar: null,
  renderInput: null,
  onMaxFileSizeReached: null,
};

ImageUploader.propTypes = {
  ...ComponentCommon.propTypes,
  toBase64: PropTypes.bool,
  borderRadius: PropTypes.number,
  max: PropTypes.number,
  cropClassName: PropTypes.string,
  renderExisting: PropTypes.func,
  renderEmpty: PropTypes.func,
  renderToolbar: PropTypes.func,
  renderInput: PropTypes.func,
  onMaxFileSizeReached: PropTypes.func,
};
