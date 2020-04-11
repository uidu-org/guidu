import { Popup } from '@uidu/editor-common';
import React, { PureComponent } from 'react';
import { Container } from './styles';

export type Coordinates = {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
};

export interface Props {
  zIndex?: number;
  className?: string;
  containerRef?: (node: HTMLElement) => void;
  target?: HTMLElement;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  offset?: number[];
  fitWidth?: number;
  fitHeight?: number;
  alignX?: 'left' | 'center' | 'right';
  alignY?: 'bottom' | 'top';
  onPositionCalculated?: (position: Coordinates) => any;
}

export {
  getNearestNonTextNode,
  getOffsetParent,
  handlePositionCalculatedWith,
} from './utils';

export default class FloatingToolbar extends PureComponent<Props, any> {
  render() {
    const {
      containerRef,
      children,
      target,
      offset,
      fitWidth,
      fitHeight = 40,
      onPositionCalculated,
      popupsMountPoint,
      popupsBoundariesElement,
      className,
      alignX,
      alignY,
      zIndex,
    } = this.props;

    if (!target) {
      return null;
    }

    return (
      <Popup
        alignX={alignX}
        alignY={alignY}
        target={target}
        zIndex={zIndex}
        mountTo={popupsMountPoint}
        boundariesElement={popupsBoundariesElement}
        offset={offset}
        fitWidth={fitWidth}
        fitHeight={fitHeight}
        onPositionCalculated={onPositionCalculated}
      >
        <Container
          height={fitHeight}
          className={className}
          innerRef={containerRef}
        >
          {children}
        </Container>
      </Popup>
    );
  }
}
