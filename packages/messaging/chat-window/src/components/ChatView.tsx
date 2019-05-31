import clone from 'lodash.clone';
import React, { Component } from 'react';
import { ChatViewProps, ChatViewState } from 'src/types';

let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get() {
      supportsPassive = true;
    },
  });
  window.addEventListener('test', null, opts);
} catch (e) {
  /* pass */
}

export default class ChatView extends Component<ChatViewProps, ChatViewState> {
  static defaultProps = {
    flipped: false,
    scrollLoadThreshold: 10,
    shouldTriggerLoad: () => {
      return true;
    },
    loadingSpinnerDelegate: <div />,
    className: '',
  };

  state = {
    isInfiniteLoading: false,
  };

  private scrollable: React.RefObject<HTMLDivElement> = React.createRef();
  private loadingSpinner: React.RefObject<HTMLDivElement> = React.createRef();
  private rafRequestId: number | null = null; // for cleaning up outstanding requestAnimationFrames on WillUnmount
  private scrollTop: number = 0; // regular mode initial scroll
  private scrollHeight: number | undefined = undefined; // it's okay, this won't be read until the second render.
  // In flipped mode, we need to measure the scrollable height from the DOM to write to the scrollTop.
  // Flipped and regular measured heights are symmetrical and don't depend on the scrollTop

  componentDidMount() {
    // If there are not yet any children (they are still loading),
    // this is a no-op as we are at both the top and bottom of empty viewport
    const heightDifference = this.props.flipped
      ? this.scrollable.current.scrollHeight -
        this.scrollable.current.clientHeight
      : 0;

    this.scrollable.current.scrollTop = heightDifference;
    this.scrollTop = heightDifference;

    let lastY = 0; // Needed in order to determine direction of scroll.
    this.scrollable.current.addEventListener('touchstart', event => {
      lastY = event.touches[0].clientY;
    });

    this.scrollable.current.addEventListener('touchmove', event => {
      const top = event.touches[0].clientY;
      // Determine scroll position and direction.
      const scrollTop = (event.currentTarget as any).scrollTop;
      const direction = lastY - top < 0 ? 'up' : 'down';
      // FIX IT!
      if (scrollTop == 0 && direction == 'up') {
        // Prevent scrolling up when already at top as this introduces a freeze.
        event.preventDefault();
      } else if (
        scrollTop >=
          (event.currentTarget as any).scrollHeight -
            (event.currentTarget as any).clientHeight &&
        direction == 'down'
      ) {
        // Prevent scrolling down when already at bottom as this also introduces a freeze.
        event.preventDefault();
      }
      lastY = top;
    });

    // Unless passive events are supported, we must not hook onScroll event
    // directly - that will break hardware accelerated scrolling. We poll it
    // with requestAnimationFrame instead.
    if (supportsPassive) {
      this.scrollable.current.addEventListener('scroll', this.onScroll, {
        passive: true,
      });
    } else {
      this.rafRequestId = window.requestAnimationFrame(this.pollScroll);
    }

    // upper ref
    if (typeof this.props.returnScrollable === 'function')
      this.props.returnScrollable(this.scrollable.current);
  }

  // componentDidUpdate(prevProps, prevState) {
  componentDidUpdate() {
    this.updateScrollTop();
  }

  componentWillUnmount() {
    (this.scrollable.current as any).removeEventListener(
      'scroll',
      this.onScroll,
      {
        passive: true,
      },
    );
    window.cancelAnimationFrame(this.rafRequestId);
  }

  // componentWillUpdate(nextProps, nextState) {}

  // detect when dom has changed underneath us- either scrollTop or scrollHeight (layout reflow)
  // may have changed.
  onScroll = () => {
    if (this.scrollable.current.scrollTop !== this.scrollTop) {
      if (this.shouldTriggerLoad()) {
        this.setState({
          isInfiniteLoading: true,
        });
        const p = this.props.onInfiniteLoad();
        p.then(() =>
          this.setState({
            isInfiniteLoading: false,
          }),
        );
      }
      // the dom is ahead of the state
    }
    this.updateScrollTop();
  };

  pollScroll = () => {
    this.onScroll();
    this.rafRequestId = window.requestAnimationFrame(this.pollScroll);
  };

  isPassedThreshold = (
    flipped,
    scrollLoadThreshold,
    scrollTop,
    scrollHeight,
    clientHeight,
  ) => {
    return flipped
      ? scrollTop <= scrollLoadThreshold
      : scrollTop >= scrollHeight - clientHeight - scrollLoadThreshold;
  };

  shouldTriggerLoad() {
    const passedThreshold = this.isPassedThreshold(
      this.props.flipped,
      this.props.scrollLoadThreshold,
      this.scrollable.current.scrollTop,
      this.scrollable.current.scrollHeight,
      this.scrollable.current.clientHeight,
    );
    return (
      passedThreshold &&
      !this.state.isInfiniteLoading &&
      this.props.shouldTriggerLoad()
    );
  }

  updateScrollTop() {
    // todo this is only the happy path
    let newScrollTop =
      this.scrollable.current.scrollTop +
      (this.props.flipped
        ? this.scrollable.current.scrollHeight - (this.scrollHeight || 0)
        : 0);

    // if scrollHeightDifference is > 0 then something was removed from list
    const scrollHeightDifference = this.scrollHeight
      ? this.scrollHeight - this.scrollable.current.scrollHeight
      : 0;

    // if something was removed from list we need to include this difference in new scroll top
    if (this.props.flipped && scrollHeightDifference > 0) {
      newScrollTop += scrollHeightDifference;
    }

    if (newScrollTop !== this.scrollable.current.scrollTop) {
      this.scrollable.current.scrollTop = newScrollTop;
    }

    this.scrollTop = this.scrollable.current.scrollTop;
    this.scrollHeight = this.scrollable.current.scrollHeight;

    // Setting scrollTop can halt user scrolling (and disables hardware acceleration)

    // Both cases - flipped and refular - have cases where the content expands in the proper direction,
    // or the content expands in the wrong direciton. Either history or new message in both cases.
    // We are only handling half of the cases. Or an image resized above or below us.
  }

  render() {
    const displayables = clone(this.props.children);
    if (this.props.flipped && !this.props.reversed) {
      displayables.reverse();
    }

    const loadSpinner = (
      <div ref={this.loadingSpinner}>
        {this.state.isInfiniteLoading
          ? this.props.loadingSpinnerDelegate
          : null}
      </div>
    );

    return (
      <div
        className={this.props.className}
        ref={this.scrollable}
        style={{
          overflowX: 'hidden',
          overflowY: 'scroll',
          // overflowScrolling: 'touch',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {this.props.flipped ? loadSpinner : null}
        {displayables}
        {this.props.flipped ? null : loadSpinner}
      </div>
    );
  }
}
