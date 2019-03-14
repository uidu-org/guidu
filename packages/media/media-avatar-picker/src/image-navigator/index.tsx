import * as React from 'react';
import { Component } from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { gridSize } from '@uidu/theme';
import Button from '@uidu/button';
import ScaleLargeIcon from '@atlaskit/icon/glyph/media-services/scale-large';
import ScaleSmallIcon from '@atlaskit/icon/glyph/media-services/scale-small';
import ImageCropper, { OnLoadHandler } from '../image-cropper';
import Slider from '@atlaskit/field-range';
import Spinner from '@uidu/spinner';
import {
  Ellipsify,
  Camera,
  Rectangle,
  Vector2,
  messages,
} from '@uidu/media-ui';
import * as exenv from 'exenv';
import {
  Container,
  SliderContainer,
  FileInput,
  ImageUploader,
  DragZone,
  DragZoneImage,
  DragZoneText,
  SelectionBlocker,
  PaddedBreak,
  ImageBg,
} from './styled';
import { uploadPlaceholder, errorIcon } from './images';
import {
  constrainPos,
  constrainScale,
  constrainEdges,
} from '../constraint-util';
import { dataURItoFile, fileSizeMb } from '../util';
import { ERROR, MAX_SIZE_MB, ACCEPT } from '../avatar-picker-dialog';

export const CONTAINER_SIZE = gridSize() * 32;
export const CONTAINER_INNER_SIZE = gridSize() * 25;
export const CONTAINER_PADDING = (CONTAINER_SIZE - CONTAINER_INNER_SIZE) / 2;

// Large images (a side > CONTAINER_SIZE) will have a scale between 0 - 1.0
// Small images (a side < CONTAINER_SIZE) will have scales greater than 1.0
// Therefore the context of the slider range min-max depends on the size of the image.
// This constant is used for the max value for smaller images, as the (scale * 100) will be greater than 100.
export const MAX_SMALL_IMAGE_SCALE = 2500;

export const containerRect = new Rectangle(CONTAINER_SIZE, CONTAINER_SIZE);
export const containerPadding = new Vector2(
  CONTAINER_PADDING,
  CONTAINER_PADDING,
);

export interface CropProperties {
  x: number;
  y: number;
  size: number;
}

export interface Props {
  imageSource?: string;
  errorMessage?: string;
  onImageLoaded: (file: File, crop: CropProperties) => void;
  onLoad?: OnLoadHandler;
  onPositionChanged: (x: number, y: number) => void;
  onSizeChanged: (size: number) => void;
  onRemoveImage: () => void;
  onImageUploaded: (file: File) => void;
  onImageError: (errorMessage: string) => void;
  isLoading?: boolean;
}

export interface State {
  camera: Camera;
  imagePos: Vector2;
  cursorPos: Vector2;
  scale: number;
  isDragging: boolean;
  minScale: number;
  fileImageSource?: string;
  imageFile?: File;
  isDroppingFile: boolean;
}

const defaultState = {
  camera: new Camera(containerRect, new Rectangle(0, 0)),
  imagePos: containerPadding,
  cursorPos: new Vector2(0, 0),
  minScale: 1,
  scale: 1,
  isDragging: false,
  fileImageSource: undefined,
  isDroppingFile: false,
};

export class ImageNavigator extends Component<
  Props & InjectedIntlProps,
  State
> {
  state: State = defaultState;

  componentWillMount() {
    if (!exenv.canUseDOM) {
      return;
    }
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onDragStarted = (x: number, y: number) => {
    this.setState({
      isDragging: true,
      cursorPos: new Vector2(x, y),
    });
  };

  onMouseMove = (e: MouseEvent) => {
    if (this.state.isDragging) {
      const { scale, camera, imagePos, cursorPos } = this.state;
      const newCursorPos = new Vector2(e.screenX, e.screenY);
      const cursorDelta = newCursorPos.sub(cursorPos);
      const newImagePos = constrainPos(
        imagePos.add(cursorDelta),
        camera.scaledImg(scale),
      );
      this.setState({
        cursorPos: newCursorPos,
        imagePos: newImagePos,
      });
    }
  };

  onMouseUp = () => {
    const { imagePos, scale } = this.state;
    this.setState({
      isDragging: false,
    });
    this.exportImagePos(imagePos.scaled(scale).map(Math.round));
  };

  /**
   * When newScale change we want to zoom in/out relative to the center of the frame.
   * @param newScale New scale in 0-100 format.
   */
  onScaleChange = (newScale: number) => {
    const { camera, minScale, scale, imagePos } = this.state;

    const constrainedScale = constrainScale(
      newScale / 100,
      minScale,
      camera.originalImg,
    );

    const newPos = camera
      .scaledOffset(imagePos.scaled(-1), scale, constrainedScale)
      .scaled(-1);
    const constrainedPos = constrainEdges(
      newPos,
      camera.scaledImg(constrainedScale),
    );

    this.setState({
      scale: constrainedScale,
      imagePos: constrainedPos,
    });

    const haveRenderedImage = !!camera.originalImg.width;
    if (haveRenderedImage) {
      this.exportImagePos(constrainedPos.scaled(1 / constrainedScale));
      this.exportSize(constrainedScale);
    }
  };

  /**
   * This gets called when the cropper loads an image
   * at this point we will be able to get the height/width
   * @param width the width of the image
   * @param height the height of the image
   */
  onImageSize = (width: number, height: number) => {
    const { imageFile, imagePos } = this.state;
    const scale = this.calculateMinScale(width, height);
    // imageFile will not exist if imageSource passed through props.
    // therefore we have to create a File, as one needs to be raised by dialog parent component when Save clicked.
    const file = imageFile || (this.dataURI && dataURItoFile(this.dataURI));
    const minSize = Math.min(width, height);
    if (file) {
      this.props.onImageLoaded(file, {
        ...imagePos,
        size: minSize,
      });
    }
    this.setState({
      camera: new Camera(containerRect, new Rectangle(width, height)),
      minScale: scale,
      scale,
    });
  };

  calculateMinScale(width: number, height: number): number {
    return Math.max(
      CONTAINER_INNER_SIZE / width,
      CONTAINER_INNER_SIZE / height,
    );
  }

  exportSize(newScale: number): void {
    const { width, height } = this.state.camera.originalImg;
    // adjust cropped properties by scale value
    const minSize = Math.min(width, height);
    const size =
      minSize < CONTAINER_SIZE
        ? minSize
        : Math.round(CONTAINER_INNER_SIZE / newScale);
    this.props.onSizeChanged(size);
  }

  exportImagePos(pos: Vector2): void {
    const { scale } = this.state;
    const exported = pos
      .scaled(scale)
      .sub(containerPadding)
      .scaled(1.0 / scale)
      .map(Math.abs)
      .map(Math.round);
    this.props.onPositionChanged(exported.x, exported.y);
  }

  validateFile(imageFile: File): string | null {
    const {
      intl: { formatMessage },
    } = this.props;

    if (ACCEPT.indexOf(imageFile.type) === -1) {
      return formatMessage(ERROR.FORMAT);
    } else if (fileSizeMb(imageFile) > MAX_SIZE_MB) {
      return formatMessage(ERROR.SIZE, {
        MAX_SIZE_MB,
      });
    }
    return null;
  }

  readFile(imageFile: File) {
    const reader = new FileReader();
    reader.onload = (e: Event) => {
      const fileImageSource = (e.target as FileReader).result;
      const { onImageUploaded } = this.props;

      if (onImageUploaded) {
        onImageUploaded(imageFile);
      }

      // TODO: [ts30] Add proper handling for null and ArrayBuffer
      this.setState({ fileImageSource: fileImageSource as string, imageFile });
    };
    reader.readAsDataURL(imageFile);
  }

  // Trick to have a nice <input /> appearance
  onUploadButtonClick: React.MouseEventHandler = e => {
    const input = e.currentTarget.querySelector(
      '#image-input',
    ) as HTMLInputElement;

    if (input) {
      input.click();
    }
  };

  onFileChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.currentTarget.files && e.currentTarget.files.length) {
      const file = e.currentTarget.files[0];
      const validationError = this.validateFile(file);

      if (validationError) {
        this.props.onImageError(validationError);
      } else {
        this.readFile(file);
      }
    }
  };

  updateDroppingState(e: React.DragEvent<{}>, state: boolean) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ isDroppingFile: state });
  }

  onDragEnter = (e: React.DragEvent<{}>) => {
    this.updateDroppingState(e, true);
  };

  onDragOver = (e: React.DragEvent<{}>) => {
    this.updateDroppingState(e, true);
  };

  onDragLeave = (e: React.DragEvent<{}>) => {
    this.updateDroppingState(e, false);
  };

  onDrop = (e: React.DragEvent<{}>) => {
    e.stopPropagation();
    e.preventDefault();
    const dt = e.dataTransfer;
    const file = dt.files[0];
    const validationError = this.validateFile(file);

    this.setState({ isDroppingFile: false });

    if (validationError) {
      this.props.onImageError(validationError);
    } else {
      this.readFile(file);
    }
  };

  renderDragZone = () => {
    const {
      intl: { formatMessage },
    } = this.props;
    const { isDroppingFile } = this.state;
    const { errorMessage, isLoading } = this.props;
    const showBorder = !isLoading && !!!errorMessage;
    const dropZoneImageSrc = errorMessage ? errorIcon : uploadPlaceholder;
    let dragZoneText =
      errorMessage || formatMessage(messages.drag_and_drop_images_here);
    const dragZoneAlt = errorMessage || formatMessage(messages.upload_image);

    return (
      <DragZone
        showBorder={showBorder}
        isDroppingFile={isDroppingFile}
        onDragLeave={this.onDragLeave}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      >
        {isLoading ? (
          <Spinner size="medium" />
        ) : (
          <div>
            <DragZoneImage src={dropZoneImageSrc} alt={dragZoneAlt} />
            <DragZoneText isFullSize={!!errorMessage}>
              <Ellipsify text={dragZoneText} lines={3} />
            </DragZoneText>
          </div>
        )}
      </DragZone>
    );
  };

  renderImageUploader() {
    const { errorMessage, isLoading } = this.props;

    return (
      <ImageUploader>
        {this.renderDragZone()}
        {isLoading ? null : (
          <div>
            <PaddedBreak>
              <FormattedMessage
                {...(errorMessage ? messages.try_again : messages.or)}
              />
            </PaddedBreak>
            <Button onClick={this.onUploadButtonClick} isDisabled={isLoading}>
              <FormattedMessage {...messages.upload_photo} />
              <FileInput
                type="file"
                id="image-input"
                onChange={this.onFileChange}
                accept={ACCEPT.join(',')}
              />
            </Button>
          </div>
        )}
      </ImageUploader>
    );
  }

  onRemoveImage = () => {
    this.setState(defaultState);
    this.props.onRemoveImage();
  };

  renderImageCropper(dataURI: string) {
    const { camera, imagePos, scale, isDragging, minScale } = this.state;
    const { onLoad, onImageError } = this.props;
    const { onDragStarted, onImageSize, onRemoveImage } = this;

    return (
      <div>
        <ImageBg />
        <ImageCropper
          scale={scale}
          imageSource={dataURI}
          imageWidth={camera.originalImg.width}
          containerSize={CONTAINER_SIZE}
          isCircularMask={false}
          top={imagePos.y}
          left={imagePos.x}
          onDragStarted={onDragStarted}
          onImageSize={onImageSize}
          onLoad={onLoad}
          onRemoveImage={onRemoveImage}
          onImageError={onImageError}
        />
        <SliderContainer>
          <ScaleSmallIcon label="scale-small-icon" />
          <Slider
            value={scale * 100}
            min={minScale * 100}
            max={minScale > 1 ? MAX_SMALL_IMAGE_SCALE : 100}
            onChange={this.onScaleChange}
          />
          <ScaleLargeIcon label="scale-large-icon" />
        </SliderContainer>
        {isDragging ? <SelectionBlocker /> : null}
      </div>
    );
  }

  // We prioritize passed image rather than the one coming from the uploader
  private get dataURI(): string | undefined {
    const { imageSource, errorMessage } = this.props;
    const { fileImageSource } = this.state;

    return errorMessage ? undefined : imageSource || fileImageSource;
  }

  render() {
    const { isLoading } = this.props;
    const { dataURI } = this;
    const content =
      dataURI && !isLoading
        ? this.renderImageCropper(dataURI)
        : this.renderImageUploader();

    return <Container>{content}</Container>;
  }
}

export default injectIntl(ImageNavigator);
