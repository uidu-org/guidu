/* eslint-disable react/require-default-props */

import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@uidu/analytics';
import { Placement, Popper } from '@uidu/popper';
import Portal from '@uidu/portal';
import { layers } from '@uidu/theme';
import flushable from 'flushable';
import React from 'react';
import NodeResolver from 'react-node-resolver';
import { StyledComponentBase } from 'styled-components';
import { Tooltip as StyledTooltip } from '../styled';
import { FakeMouseElement, PositionType, PositionTypeBase } from '../types';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';
import Animation from './Animation';
import { hoveredPayload, unhoveredPayload } from './utils/analytics-payloads';

const SCROLL_OPTIONS = { capture: true, passive: true };

interface FakeMouseCoordinates {
  top: number;
  left: number;
}

function getMousePosition(
  mouseCoordinates: FakeMouseCoordinates,
): FakeMouseElement {
  const safeMouse = mouseCoordinates || { top: 0, left: 0 };
  const getBoundingClientRect = () => {
    return {
      top: safeMouse.top,
      left: safeMouse.left,
      bottom: safeMouse.top,
      right: safeMouse.left,
      width: 0,
      height: 0,
    };
  };
  return {
    getBoundingClientRect,
    clientWidth: 0,
    clientHeight: 0,
  };
}

export interface TooltipProps extends WithAnalyticsEventsProps {
  /** The content of the tooltip */
  content: React.ReactNode;
  /** Classname applied to tooltip container */
  className?: string;
  /** Extend `TooltipPrimitive` to create your own tooltip and pass it as component */
  component?: StyledComponentBase<
    any,
    { truncate?: boolean; style?: any; className?: any },
    any
  >;
  /** Time in milliseconds to wait before showing and hiding the tooltip. Defaults to 300. */
  delay?: number;
  /**
    Hide the tooltip when the click event is triggered. This should be
    used when tooltip should be hidden if `onClick` react synthetic event
    is triggered, which happens after `onMouseDown` event
  */
  hideTooltipOnClick?: boolean;
  /**
    Hide the tooltip when the mousedown event is triggered. This should be
    used when tooltip should be hidden if `onMouseDown` react synthetic event
    is triggered, which happens before `onClick` event
  */
  hideTooltipOnMouseDown?: boolean;
  /**
    Where the tooltip should appear relative to the mouse. Only used when the
    `position` prop is set to 'mouse'
  */
  mousePosition?: PositionTypeBase;
  /**
    Function to be called when the tooltip will be shown. It is called when the
    tooltip begins to animate in.
  */
  onShow?: () => void;
  /**
    Function to be called when the tooltip will be hidden. It is called after the
    delay, when the tooltip begins to animate out.
  */
  onHide?: () => void;
  /**
    Where the tooltip should appear relative to its target. If set to 'mouse',
    tooltip will display next to the mouse instead.
  */
  position?: PositionType;
  /**
    Replace the wrapping element. This accepts the name of a html tag which will
    be used to wrap the element.
  */
  tag?: React.ElementType;
  /** Show only one line of text, and truncate when too long */
  truncate?: boolean;
  /** Elements to be wrapped by the tooltip */
  children: React.ReactNode;
}

interface State {
  immediatelyHide: boolean;
  immediatelyShow: boolean;
  isVisible: boolean;
  renderTooltip: boolean;
}

let pendingHide: flushable.FlushableOperation;

const showTooltip = (
  fn: (isHidePending: boolean) => void,
  defaultDelay: number,
) => {
  const isHidePending = pendingHide && pendingHide.pending();
  if (isHidePending) {
    pendingHide.flush();
  }
  const pendingShow = flushable(
    () => fn(isHidePending),
    isHidePending ? 0 : defaultDelay,
  );
  return pendingShow.cancel;
};

const hideTooltip = (fn: (flushed: boolean) => void, defaultDelay: number) => {
  pendingHide = flushable(flushed => fn(flushed), defaultDelay);
  return pendingHide.cancel;
};

class Tooltip extends React.Component<TooltipProps, State> {
  static defaultProps: Pick<
    TooltipProps,
    'component' | 'delay' | 'mousePosition' | 'position' | 'tag'
  > = {
    component: StyledTooltip,
    delay: 300,
    mousePosition: 'bottom',
    position: 'bottom',
    tag: 'div',
  };

  wrapperRef?: HTMLElement;

  targetRef?: HTMLElement;

  fakeMouseElement?: FakeMouseElement;

  cancelPendingSetState = () => {};

  // set in mouseover/mouseout handlers
  state = {
    immediatelyHide: false,
    immediatelyShow: false,
    isVisible: false,
    renderTooltip: false,
  };

  componentWillUnmount() {
    this.cancelPendingSetState();
    this.removeScrollListener();
  }

  componentDidUpdate(_prevProps: TooltipProps, prevState: State) {
    if (!prevState.isVisible && this.state.isVisible) {
      if (this.props.onShow) this.props.onShow();

      window.addEventListener(
        'scroll',
        this.handleWindowScroll,
        SCROLL_OPTIONS,
      );
    } else if (prevState.isVisible && !this.state.isVisible) {
      if (this.props.onHide) this.props.onHide();
      this.removeScrollListener();
    }
  }

  removeScrollListener() {
    window.removeEventListener(
      'scroll',
      this.handleWindowScroll,
      SCROLL_OPTIONS,
    );
  }

  handleWindowScroll = () => {
    if (this.state.isVisible) {
      this.cancelPendingSetState();
      this.setState({ isVisible: false, immediatelyHide: true });
    }
  };

  handleMouseClick = () => {
    if (this.props.hideTooltipOnClick) {
      this.cancelPendingSetState();
      this.setState({ isVisible: false, immediatelyHide: true });
    }
  };

  handleMouseDown = () => {
    if (this.props.hideTooltipOnMouseDown) {
      this.cancelPendingSetState();
      this.setState({ isVisible: false, immediatelyHide: true });
    }
  };

  handleMouseOver = (e: React.MouseEvent) => {
    if (e.target === this.wrapperRef) return;
    // In the case where a tooltip is newly rendered but immediately becomes hovered,
    // we need to set the coordinates in the mouseOver event.
    if (!this.fakeMouseElement)
      this.fakeMouseElement = getMousePosition({
        left: e.clientX,
        top: e.clientY,
      });
    this.cancelPendingSetState();
    if (Boolean(this.props.content) && !this.state.isVisible) {
      this.cancelPendingSetState = showTooltip(immediatelyShow => {
        this.setState({
          isVisible: true,
          renderTooltip: true,
          immediatelyShow,
        });
      }, this.props.delay || 0);
    }
  };

  handleMouseLeave = (e: React.MouseEvent) => {
    if (e.target === this.wrapperRef) return;
    this.cancelPendingSetState();
    if (this.state.isVisible) {
      this.cancelPendingSetState = hideTooltip(immediatelyHide => {
        this.setState({ isVisible: false, immediatelyHide });
      }, this.props.delay || 0);
    }
  };

  // Update mouse coordinates, used when position is 'mouse'.
  // We are not debouncing/throttling this function because we aren't causing any
  // re-renders or performaing any intensive calculations, we're just updating a value.
  // React also doesn't play nice debounced DOM event handlers because they pool their
  // SyntheticEvent objects. Need to use event.persist as a workaround - https://stackoverflow.com/a/24679479/893630
  handleMouseMove = (event: MouseEvent) => {
    if (!this.state.renderTooltip) {
      this.fakeMouseElement = getMousePosition({
        left: event.clientX,
        top: event.clientY,
      });
    }
  };

  render() {
    const {
      children,
      className,
      content,
      position,
      mousePosition,
      truncate,
      component: TooltipContainer,
      tag: TargetContainer,
    } = this.props;

    const {
      isVisible,
      renderTooltip,
      immediatelyShow,
      immediatelyHide,
    } = this.state;
    return (
      /* eslint-disable jsx-a11y/mouse-events-have-key-events */
      <React.Fragment>
        {TargetContainer && (
          <TargetContainer
            className={className}
            onClick={this.handleMouseClick}
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseLeave}
            onMouseMove={this.handleMouseMove}
            onMouseDown={this.handleMouseDown}
            ref={(wrapperRef: HTMLElement) => {
              this.wrapperRef = wrapperRef;
            }}
          >
            <NodeResolver
              innerRef={(targetRef: HTMLElement) => {
                this.targetRef = targetRef;
              }}
            >
              {React.Children.only(children)}
            </NodeResolver>
          </TargetContainer>
        )}

        {renderTooltip && this.targetRef && this.fakeMouseElement ? (
          <Portal zIndex={layers.tooltip()}>
            <Popper
              // @ts-ignore
              referenceElement={
                // https://github.com/FezVrasta/react-popper#usage-without-a-reference-htmlelement
                // We are using a popper technique to pass in a faked element when we use mouse.
                // This is fine.
                position === 'mouse' ? this.fakeMouseElement : this.targetRef
              }
              placement={position === 'mouse' ? mousePosition : position}
            >
              {({
                ref,
                style,
                placement,
              }: {
                ref: (elm: HTMLElement) => void;
                style: Object;
                placement: Placement;
              }) =>
                TooltipContainer && (
                  <Animation
                    immediatelyShow={immediatelyShow}
                    immediatelyHide={immediatelyHide}
                    onExited={() => this.setState({ renderTooltip: false })}
                    in={isVisible}
                  >
                    {getAnimationStyles => (
                      <TooltipContainer
                        innerRef={ref}
                        className="Tooltip"
                        style={{
                          ...getAnimationStyles(placement as PositionTypeBase),
                          ...style,
                        }}
                        truncate={truncate || false}
                      >
                        {content}
                      </TooltipContainer>
                    )}
                  </Animation>
                )
              }
            </Popper>
          </Portal>
        ) : null}
      </React.Fragment>
      /* eslint-enable */
    );
  }
}

export { Tooltip as TooltipWithoutAnalytics };
const createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

export type TooltipType = Tooltip;

export default withAnalyticsContext({
  componentName: 'tooltip',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onHide: unhoveredPayload,
    onShow: createAndFireEventOnAtlaskit({ ...hoveredPayload }),
  })(Tooltip),
);
