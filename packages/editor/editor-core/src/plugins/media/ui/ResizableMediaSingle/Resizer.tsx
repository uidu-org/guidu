import { MediaSingleLayout } from '@atlaskit/adf-schema';
import classnames from 'classnames';
import { Resizable, ResizeDirection, Size } from 're-resizable';
import * as React from 'react';
import { RefObject } from 'react';
import { gridTypeForLayout } from '../../../grid';
import { EnabledHandles, Props as ResizableMediaSingleProps } from './types';
import { handleSides, snapTo } from './utils';

type ResizerProps = ResizableMediaSingleProps & {
  selected: boolean;
  enable: EnabledHandles;
  calcNewSize: (
    newWidth: number,
    stop: boolean,
  ) => { layout: MediaSingleLayout; width: number | null };
  snapPoints: number[];
  scaleFactor?: number;
  highlights: (width: number, snapPoints: number[]) => number[] | string[];
};

type ResizerState = {
  isResizing: boolean;
};
export default class Resizer extends React.Component<
  ResizerProps,
  ResizerState
> {
  resizable: RefObject<Resizable>;
  state = {
    isResizing: false,
  };
  constructor(props: ResizerProps) {
    super(props);
    this.resizable = React.createRef();
  }

  handleResizeStart = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    // prevent creating a drag event on Firefox
    event.preventDefault();
    this.setState({ isResizing: true }, () => {
      this.props.displayGrid(
        true,
        gridTypeForLayout(this.props.layout),
        this.props.highlights(this.props.width, this.props.snapPoints),
      );
    });
  };

  handleResize = (
    _event: MouseEvent | TouchEvent,
    _direction: ResizeDirection,
    _elementRef: HTMLDivElement,
    delta: Size,
  ) => {
    const resizable = this.resizable.current;
    if (!resizable || !resizable.state.original) {
      return undefined;
    }

    const newWidth = Math.max(
      resizable.state.original.width +
        (delta.width as any) * (this.props.scaleFactor || 1),
      this.props.snapPoints[0],
    );

    const newSize = this.props.calcNewSize(newWidth, false);
    if (newSize.layout !== this.props.layout) {
      this.props.updateSize(newSize.width, newSize.layout);
    }

    this.props.displayGrid(
      true,
      gridTypeForLayout(newSize.layout),
      this.props.highlights(newWidth, this.props.snapPoints),
    );
    resizable.updateSize({ width: newWidth, height: 'auto' });
  };

  handleResizeStop = (
    _event: MouseEvent | TouchEvent,
    _direction: string,
    _refToElement: HTMLElement,
    delta: { width: number; height: number },
  ) => {
    const resizable = this.resizable.current;
    if (!resizable || !resizable.state.original) {
      return undefined;
    }

    const newWidth = Math.max(
      resizable.state.original.width + delta.width,
      this.props.snapPoints[0],
    );

    const snapWidth = snapTo(newWidth, this.props.snapPoints);
    const newSize = this.props.calcNewSize(snapWidth, true);

    // show committed grid size
    this.props.displayGrid(
      true,
      gridTypeForLayout(newSize.layout),
      this.props.highlights(newWidth, this.props.snapPoints),
    );

    this.setState({ isResizing: false }, () => {
      this.props.updateSize(newSize.width, newSize.layout);
      this.props.displayGrid(false, gridTypeForLayout(this.props.layout));
    });
  };

  render() {
    const handleStyles: Record<string, {}> = {};
    const handles: Record<string, string> = {};
    handleSides.forEach(side => {
      handles[side] = `mediaSingle-resize-handle-${side}`;
      handleStyles[side] = {
        width: '24px',
        [side]: '-13px',
        zIndex: 99,
      };
    });

    // Ideally, Resizable would let you pass in the component rather than
    // the div. For now, we just apply the same styles using CSS
    return (
      <Resizable
        ref={this.resizable}
        onResize={this.handleResize}
        size={{
          width: this.props.width,
        }}
        className={classnames(
          'media-single',
          `image-${this.props.layout}`,
          this.props.className,
          {
            'is-resizing': this.state.isResizing,
            'not-resized': !this.props.pctWidth,
            'mediaSingle-selected': this.props.selected,
            'media-wrapped':
              this.props.layout === 'wrap-left' ||
              this.props.layout === 'wrap-right',
          },
        )}
        handleWrapperClass={'mediaSingle-resize-wrapper'}
        handleClasses={handles}
        handleStyles={handleStyles}
        enable={this.props.enable}
        onResizeStop={this.handleResizeStop}
        onResizeStart={this.handleResizeStart}
      >
        {this.props.children}
      </Resizable>
    );
  }
}
