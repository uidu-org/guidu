// @flow
export type FlipPositionType = 'top' | 'right' | 'bottom' | 'left';

export type BoundariesElementType = 'viewport' | 'window' | 'scrollParent';

export type PositionType =
  | 'top left'
  | 'top center'
  | 'top right'
  | 'right top'
  | 'right middle'
  | 'right bottom'
  | 'bottom left'
  | 'bottom center'
  | 'bottom right'
  | 'left top'
  | 'left middle'
  | 'left bottom';

export type CSSPositionType = 'absolute' | 'fixed';

export type OffsetStateType = {
  top?: number,
  left?: number,
  width?: number,
  height?: number,
  position?: { position: CSSPositionType } | CSSPositionType,
};

export type OffsetPopperType = {
  top: number,
  left: number,
  width: number,
  height: number,
  position: { position: CSSPositionType } | CSSPositionType,
};

export type PopperStateType = {
  placement: PositionType,
  originalPlacement: PositionType,
  flipped: boolean,
  hide: boolean,
  arrowElement: Element,
  boundaries: Object,
  position: CSSPositionType,
  originalPosition: PositionType,
  offsets: {
    popper: OffsetPopperType,
  },
};
