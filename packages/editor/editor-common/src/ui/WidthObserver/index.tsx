import React from 'react';
import { WidthObserverProps } from './types';
import { WidthDetectorObserver } from './width-detector-observer';

/**
 * This component will observer the current width,
 * and it will call the `setWidth` callback every time this changes.
 *
 * The only required is the parent HTMLElement should have `position: relative`
 * because this is an absolute element.
 */
export const WidthObserver = React.memo((props: WidthObserverProps) => (
  <WidthDetectorObserver
    setWidth={props.setWidth}
    offscreen={props.offscreen}
  />
));

export default WidthObserver;
