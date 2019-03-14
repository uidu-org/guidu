import * as React from 'react';
import { CSSProperties } from 'react';
import {
  Rectangle,
  Camera,
  Vector2,
  getCssFromImageOrientation,
} from '@uidu/media-ui';
import { BaselineExtend, ImageWrapper, Img } from '../../styled';
import { ZoomLevel } from '../../domain/zoomLevel';
import { closeOnDirectClick } from '../../utils/closeOnDirectClick';
import { ZoomControls } from '../../zoomControls';
import { Outcome } from '../../domain';

export function zoomLevelAfterResize(
  newCamera: Camera,
  oldCamera: Camera,
  oldZoomLevel: ZoomLevel,
) {
  const isImgScaledToFit = oldZoomLevel.value === oldCamera.scaleDownToFit;
  const zoomLevelToRefit = new ZoomLevel(newCamera.scaleDownToFit);
  return isImgScaledToFit ? zoomLevelToRefit : oldZoomLevel;
}

const clientRectangle = (el: HTMLElement): Rectangle => {
  const { clientWidth, clientHeight } = el;
  return new Rectangle(clientWidth, clientHeight);
};

const naturalSizeRectangle = (el: HTMLImageElement): Rectangle => {
  const { naturalWidth, naturalHeight } = el;
  return new Rectangle(naturalWidth, naturalHeight);
};

export type Props = {
  src: string;
  orientation?: number;
  onClose?: () => void;
  onLoad: () => void;
  onError: () => void;
};

export type State = {
  zoomLevel: ZoomLevel;
  camera: Outcome<Camera, never>;
  isDragging: boolean;
  cursorPos: Vector2;
};

const initialState: State = {
  zoomLevel: new ZoomLevel(1),
  camera: Outcome.pending(),
  isDragging: false,
  cursorPos: new Vector2(0, 0),
};

export class InteractiveImg extends React.Component<Props, State> {
  state: State = initialState;
  private wrapper?: HTMLDivElement;
  private saveWrapperRef = (ref: HTMLDivElement) => (this.wrapper = ref);

  componentDidMount() {
    this.state = initialState;
    window.addEventListener('resize', this.onResize);
    document.addEventListener('mousemove', this.panImage);
    document.addEventListener('mouseup', this.stopDragging);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('mousemove', this.panImage);
    document.removeEventListener('mouseup', this.stopDragging);
  }

  render() {
    const { src, onClose, orientation } = this.props;
    const { zoomLevel, camera, isDragging } = this.state;

    const canDrag = camera.match({
      successful: camera => zoomLevel.value > camera.scaleToFit,
      pending: () => false,
      failed: () => false,
    });
    // We use style attr instead of SC prop for perf reasons
    const imgStyle: CSSProperties = camera.match({
      successful: camera => camera.scaledImg(zoomLevel.value),
      pending: () => ({}),
      failed: () => ({}),
    });
    if (orientation) {
      const transform = getCssFromImageOrientation(orientation);
      imgStyle.transform = transform;
    }

    return (
      <ImageWrapper
        onClick={closeOnDirectClick(onClose)}
        ref={this.saveWrapperRef}
      >
        <Img
          canDrag={canDrag}
          isDragging={isDragging}
          src={src}
          style={imgStyle}
          onLoad={this.onImgLoad}
          onError={this.onError}
          onMouseDown={this.startDragging}
          shouldPixelate={zoomLevel.value > 1}
        />
        {/*
          The BaselineExtend element is required to align the Img element in the
          vertical center of the page. It ensures that the parent container is
          at least 100% of the viewport height and makes it possible to set
          vertical-align: middle on the image.
         */}
        <BaselineExtend />
        <ZoomControls zoomLevel={zoomLevel} onChange={this.onZoomChange} />
      </ImageWrapper>
    );
  }

  private onImgLoad = (ev: React.SyntheticEvent<HTMLImageElement>) => {
    if (this.wrapper) {
      const viewport = clientRectangle(this.wrapper);
      const originalImg = naturalSizeRectangle(ev.currentTarget);
      const camera = new Camera(viewport, originalImg);
      this.setState({
        camera: Outcome.successful(camera),
        zoomLevel: new ZoomLevel(camera.scaleDownToFit),
      });
    }
    this.props.onLoad();
  };

  private onError = () => {
    this.props.onError();
  };

  private onResize = () => {
    this.state.camera.whenSuccessful(oldCamera => {
      if (!this.wrapper) {
        return;
      }
      const oldZoomLevel = this.state.zoomLevel;

      const newViewport = clientRectangle(this.wrapper);
      const newCamera = oldCamera.resizedViewport(newViewport);
      const newZoomLevel = zoomLevelAfterResize(
        newCamera,
        oldCamera,
        oldZoomLevel,
      );

      this.setState({
        camera: Outcome.successful(newCamera),
        zoomLevel: newZoomLevel,
      });
    });
  };

  private onZoomChange = (nextZoomLevel: ZoomLevel) => {
    this.state.camera.whenSuccessful(camera => {
      const { wrapper } = this;
      if (!wrapper) {
        return;
      }
      const { scrollLeft, scrollTop } = wrapper;
      const prevOffset = new Vector2(scrollLeft, scrollTop);
      const prevZoomLevel = this.state.zoomLevel;
      this.setState({ zoomLevel: nextZoomLevel }, () => {
        const { x, y } = camera.scaledOffset(
          prevOffset,
          prevZoomLevel.value,
          nextZoomLevel.value,
        );
        wrapper.scrollLeft = x;
        wrapper.scrollTop = y;
      });
    });
  };

  private startDragging = (ev: React.MouseEvent<{}>) => {
    ev.preventDefault();
    this.setState({
      isDragging: true,
      cursorPos: new Vector2(ev.screenX, ev.screenY),
    });
  };

  private stopDragging = (ev: MouseEvent) => {
    ev.preventDefault();
    this.setState({ isDragging: false });
  };

  private panImage = (ev: MouseEvent) => {
    if (this.state.isDragging && this.wrapper) {
      const cursorPos = new Vector2(ev.screenX, ev.screenY);
      const delta = this.state.cursorPos.sub(cursorPos);
      this.setState({ cursorPos });
      this.wrapper.scrollLeft += delta.x;
      this.wrapper.scrollTop += delta.y;
    }
  };
}
