// @flow
import React, { Component, type Node, type ElementRef } from 'react';
import styled from 'styled-components';
import rafSchedule from 'raf-schd';

import Popper from 'popper.js';
import ScrollBlock from './internal/ScrollBlock';
import {
  getFlipBehavior,
  positionPropToPopperPosition,
} from './internal/helpers';
import ContentContainer from '../styledContentContainer';
import type {
  FlipPositionType,
  BoundariesElementType,
  PositionType,
  CSSPositionType,
  OffsetStateType,
  PopperStateType,
} from '../types';

/* eslint-disable react/no-unused-prop-types */

export type Props = {
  /** Sets whether the content auto flip when it reaches the border set it as true for default flip or set the custom flip positions */
  autoFlip?: boolean | FlipPositionType | Array<FlipPositionType>,
  /** Element to act as a boundary for the Layer. The Layer will not sit outside this element if it can help it. If, through it's normal positoning, it would end up outside the boundary the layer will flip positions if the autoPosition prop is set. */
  boundariesElement?: BoundariesElementType,
  /** Target to which layer is attached */
  children?: Node,
  /** HTML content to display in the layer. Will be aligned to the target according to the position prop. */
  content?: Node,
  /** String representing the offsets from the target element in the format "[x-offset],[y-offset]", measured in pixels. */
  offset?: string,
  /** Callback that is used to know when the flipped state of Layer changes. This occurs when placing a Layered element in the requested position would cause Layer to be rendered outside of the boundariesElement (usually viewport). */
  onFlippedChange?: Function,
  /** Position of a layer relative to its target. The position attribute takes two positional arguments in the format position="edge edge-position", where edge specifies what edge to align the layer to, and edge-position specifies where on that edge the layer should appear. */
  position?: PositionType,
  /** z-index for the layer component */
  zIndex?: number,
  /** Lock scrolling behind the layer */
  lockScroll?: boolean,
  /** Force the layer to always be positioned fixed to the viewport. Note that the layer will become detached from the target element when scrolling so scroll lock or close on scroll handling may be necessary. */
  isAlwaysFixed?: boolean,
  /** Callback that is used to know when the Layer positions it's content. This will only be called once soon after mounting when the Layer's transformed/flipped position is first calculated. */
  onPositioned?: Function,
};

type State = {
  hasExtractedStyles: boolean,
  position: ?PositionType,
  transform: ?string,
  flipped: boolean,
  actualPosition: ?CSSPositionType,
  // We set these default offsets to prevent a flash of popper content in the wrong position
  // which can cause incorrect height calculations. Popper will calculate these values
  offsets: {
    popper: OffsetStateType,
  },
  originalPosition: ?PositionType,
  // fix Safari parent width: https://product-fabric.atlassian.net/browse/ED-1784
  cssPosition: CSSPositionType,
  originalHeight: ?number,
  maxHeight: ?number,
  fixedOffset: ?OffsetStateType,
};

// We create a dummy target when making the menu fixed so that we can force popper.js to use fixed positioning
// without affecting child layout of the actual target since children of fixed position elements can't use percentage
// heights/widths.
const FixedTarget = styled.div`
  ${({ fixedOffset, targetRef }) => {
    if (fixedOffset && targetRef) {
      const actualTarget = targetRef.firstChild;
      const rect = actualTarget.getBoundingClientRect();
      return `
        position: fixed;
        top: ${fixedOffset.top}px;
        left: ${fixedOffset.left}px;
        height: ${rect.height}px;
        width: ${rect.width}px;
        z-index: -1;
      `;
    }
    return 'display: none;';
  }};
`;

export default class Layer extends Component<Props, State> {
  popper: {
    destroy: Function,
  };

  targetRef: ?ElementRef<any>;

  contentRef: ?ElementRef<any>;

  fixedRef: ?ElementRef<any>;

  // working with extract-react-types
  static defaultProps = {
    autoFlip: true,
    boundariesElement: 'viewport',
    children: null,
    content: null,
    offset: '0 0',
    onFlippedChange: () => {},
    position: 'right middle',
    zIndex: 400,
    lockScroll: false,
    isAlwaysFixed: false,
    onPositioned: () => {},
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      hasExtractedStyles: false,
      position: null,
      transform: null,
      flipped: false,
      actualPosition: null,
      // We set these default offsets to prevent a flash of popper content in the wrong position
      // which can cause incorrect height calculations. Popper will calculate these values
      offsets: {
        popper: {
          left: -9999,
          top: -9999,
        },
      },
      originalPosition: null,
      // fix Safari parent width: https://product-fabric.atlassian.net/browse/ED-1784
      cssPosition: 'absolute',
      originalHeight: null,
      maxHeight: null,
      fixedOffset: null,
    };

    this.extractStyles = rafSchedule(this.extractStyles.bind(this));
  }

  componentDidMount() {
    this.applyPopper(this.props);
    this.calculateFixedOffset(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.applyPopper(nextProps);
    this.calculateFixedOffset(nextProps);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { onFlippedChange, onPositioned } = this.props;
    const {
      flipped,
      actualPosition,
      originalPosition,
      hasExtractedStyles,
    } = this.state;

    if (prevState.flipped !== flipped && onFlippedChange) {
      onFlippedChange({ flipped, actualPosition, originalPosition });
    }

    // This flag is set the first time the position is calculated from Popper and applied to the content
    if (!prevState.hasExtractedStyles && hasExtractedStyles && onPositioned) {
      onPositioned();
    }
  }

  componentWillUnmount() {
    this.extractStyles.cancel();
    if (this.popper) {
      this.popper.destroy();
    }
  }

  /* Calculate the max height of the popper if it's height is greater than the viewport to prevent
   * the bottom of the popper not being viewable.
   * Only works if the popper uses viewport as the boundary and has a fixed position ancestor.
   */
  calculateMaxHeight(
    originalHeight: number,
    currentHeight: number,
    positionTop: number,
    cssPosition: CSSPositionType,
  ) {
    let DocumentElementClientHeight: number = 0;

    if (document.documentElement) {
      DocumentElementClientHeight = document.documentElement.clientHeight;
    }
    if (
      cssPosition !== 'fixed' ||
      this.props.boundariesElement !== 'viewport'
    ) {
      return null;
    }
    const viewportHeight = Math.max(
      DocumentElementClientHeight,
      window.innerHeight || 0,
    );
    return viewportHeight < originalHeight &&
      currentHeight + positionTop >= viewportHeight - 50
      ? // allow some spacing either side of viewport height
        viewportHeight - 12
      : null;
  }

  /* Popper may return either a fixed or absolute position which would be applied to the
   * content style. In order to overcome clipping issues for overflow containing blocks when
   * the position is absolute, we create a fixed position wrapper.
   */
  calculateFixedOffset(props: Props) {
    const { isAlwaysFixed } = props;

    if (isAlwaysFixed && this.targetRef) {
      const actualTarget = this.targetRef.firstChild;
      this.setState({
        fixedOffset: {
          top: actualTarget.getBoundingClientRect().top,
          left: actualTarget.getBoundingClientRect().left,
        },
      });
    } else if (!isAlwaysFixed && this.state.fixedOffset !== null) {
      this.setState({
        fixedOffset: null,
      });
    }
  }

  /* Clamp fixed position to the window for fixed position poppers that flow off the top of the
   * window.
   * A fixed position popper is a popper who has an ancestor with position: fixed.
   *
   * It is too difficult to fix this for non-fixed position poppers without re-implementing popper's
   * offset functionality or fixing the issue upstream.
   */
  // eslint-disable-next-line class-methods-use-this
  fixPositionTopUnderflow(popperTop: number, cssPosition: CSSPositionType) {
    return popperTop >= 0 || cssPosition !== 'fixed'
      ? Math.round(popperTop)
      : 0;
  }

  extractStyles = (state: PopperStateType) => {
    if (state) {
      const popperHeight = state.offsets.popper.height;
      const left = Math.round(state.offsets.popper.left);
      // The offset position is sometimes an object and sometimes just a string...
      const cssPosition =
        typeof state.offsets.popper.position === 'object'
          ? state.offsets.popper.position.position
          : state.offsets.popper.position;
      const top = this.fixPositionTopUnderflow(
        state.offsets.popper.top,
        cssPosition,
      );

      const originalHeight = this.state.originalHeight || popperHeight;
      const maxHeight = this.calculateMaxHeight(
        originalHeight,
        popperHeight,
        top,
        cssPosition,
      );
      this.setState({
        // position: fixed or absolute
        cssPosition,
        hasExtractedStyles: true,
        transform: `translate3d(${left}px, ${top}px, 0px)`,
        // state.flipped is either true or undefined
        flipped: !!state.flipped,
        actualPosition: state.position,
        originalPosition: state.originalPosition,
        originalHeight,
        maxHeight,
      });
    }
  };

  applyPopper(props: Props) {
    if (!this.fixedRef || !this.targetRef || !this.contentRef) {
      return;
    }

    if (this.popper) {
      this.popper.destroy();
    }

    // "new Popper(...)" operation is very expensive when called on virtual DOM.
    // This condition reduces the number of calls so we can run our tests faster
    // (time was reduced from 100s to 13s).
    if (!props.content) {
      return;
    }

    // we wrap our target in a div so that we can safely get a reference to it, but we pass the
    // actual target to popper
    const actualTarget = props.isAlwaysFixed
      ? this.fixedRef
      : this.targetRef.firstChild;
    const popperOpts: Object = {
      placement: positionPropToPopperPosition(props.position),
      onCreate: this.extractStyles,
      onUpdate: this.extractStyles,
      modifiers: {
        applyStyle: {
          enabled: false,
        },
        hide: {
          enabled: false,
        },
        offset: {
          enabled: true,
          offset: this.props.offset,
        },
        flip: {
          enabled: !!this.props.autoFlip,
          flipVariations: true,
          boundariesElement: this.props.boundariesElement,
          padding: 0, // leave 0 pixels between popper and the boundariesElement
        },
        preventOverflow: {
          enabled: !!this.props.autoFlip,
          escapeWithReference: !(
            this.props.boundariesElement === 'scrollParent'
          ),
        },
      },
      positionFixed: props.isAlwaysFixed,
    };

    const flipBehavior = getFlipBehavior(props);
    if (flipBehavior) {
      popperOpts.modifiers.flip.behavior = flipBehavior;
    }

    this.popper = new Popper(actualTarget, this.contentRef, popperOpts);
  }

  render() {
    const { zIndex, lockScroll } = this.props;
    const {
      cssPosition,
      transform,
      hasExtractedStyles,
      maxHeight,
      fixedOffset,
    } = this.state;
    const opacity = hasExtractedStyles ? {} : { opacity: 0 };

    return (
      <div>
        <div
          ref={ref => {
            this.targetRef = ref;
          }}
        >
          {this.props.children}
        </div>
        <FixedTarget targetRef={this.targetRef} fixedOffset={fixedOffset}>
          <div
            style={{ height: '100%', width: '100%' }}
            ref={ref => {
              this.fixedRef = ref;
            }}
          />
        </FixedTarget>
        {lockScroll && <ScrollBlock />}
        <ContentContainer maxHeight={maxHeight}>
          <div
            ref={ref => {
              this.contentRef = ref;
            }}
            style={{
              top: 0,
              left: 0,
              position: cssPosition,
              transform,
              zIndex,
              ...opacity,
            }}
          >
            {this.props.content}
          </div>
        </ContentContainer>
      </div>
    );
  }
}

/* eslint-enable react/no-unused-prop-types */
