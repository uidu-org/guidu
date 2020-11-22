import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import Layer from '@uidu/layer';
import Spinner from '@uidu/spinner';
import { gridSize } from '@uidu/theme/constants';
import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import Wrapper, {
  Content,
  SpinnerContainer,
  Trigger,
} from '../styled/Droplist';
import itemTheme from '../theme/item-theme';
import pkg from '../version.json';

const halfFocusRing = 1;
const dropOffset = `0, ${gridSize()}px`;

if (process.env.NODE_ENV !== 'production' && !process.env.CI) {
  // eslint-disable-next-line no-console
  console.warn(
    '@uidu/droplist has been deprecated. It is an internal component and should not be used directly.',
  );
}

class Droplist extends Component<any> {
  static defaultProps = {
    appearance: 'default',
    boundariesElement: 'viewport',
    children: null,
    isLoading: false,
    isOpen: false,
    onClick: () => {},
    onKeyDown: () => {},
    onOpenChange: () => {},
    position: 'bottom left',
    isMenuFixed: false,
    shouldFitContainer: false,
    shouldFlip: true,
    trigger: null,
    onPositioned: () => {},
  };

  dropContentRef;
  triggerRef;

  componentDidMount = () => {
    this.setContentWidth();
    // We use a captured event here to avoid a radio or checkbox dropdown item firing its
    // click event first, which would cause a re-render of the element and prevent Droplist
    // from detecting the actual source of this original click event.
    document.addEventListener('click', this.handleClickOutside, true);
    document.addEventListener('keydown', this.handleEsc);
  };

  componentDidUpdate = () => {
    if (this.props.isOpen) {
      this.setContentWidth();
    }
  };

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClickOutside, true);
    document.removeEventListener('keydown', this.handleEsc);
  };

  setContentWidth = () => {
    const { dropContentRef, triggerRef } = this;
    const { shouldFitContainer } = this.props;

    // We need to manually set the content width to match the trigger width
    // if props.shouldFitContainer is true
    if (shouldFitContainer && dropContentRef && triggerRef) {
      dropContentRef.style.width = `${
        triggerRef.offsetWidth - halfFocusRing * 2
      }px`;
    }
  };

  handleEsc = (event) => {
    if ((event.key === 'Escape' || event.key === 'Esc') && this.props.isOpen) {
      this.close(event);
    }
  };

  handleClickOutside = (event) => {
    if (this.props.isOpen) {
      if (event.target instanceof Node) {
        // Rather than check for the target within the entire Droplist, we specify the trigger/content.
        // This aids with future effort in scroll-locking Droplist when isMenuFixed is enabled; the scroll
        // blanket which stretches to the viewport should not stop 'close' from being triggered.
        const withinTrigger =
          this.triggerRef && this.triggerRef.contains(event.target);
        const withinContent =
          this.dropContentRef && this.dropContentRef.contains(event.target);

        if (!withinTrigger && !withinContent) {
          this.close(event);
        }
      }
    }
  };

  close = (event) => {
    if (this.props.onOpenChange) {
      this.props.onOpenChange({ isOpen: false, event });
    }
  };

  handleContentRef = (ref) => {
    this.dropContentRef = ref;

    // If the dropdown has just been opened, we focus on the containing element so the
    // user can tab to the first dropdown item. We will only receive this ref if isOpen
    // is true or null, so no need to check for truthiness here.
    if (ref) {
      ref.focus();
    }
  };

  handleTriggerRef = (ref) => {
    this.triggerRef = ref;
  };

  render() {
    const {
      appearance,
      boundariesElement,
      children,
      isLoading,
      isOpen,
      maxHeight,
      onClick,
      onKeyDown,
      position,
      isMenuFixed,
      shouldFitContainer,
      shouldFlip,
      trigger,
      onPositioned,
      testId,
    } = this.props;

    const layerContent = isOpen ? (
      <Content
        data-role="droplistContent"
        data-testid={testId && `${testId}--content`}
        isTall={appearance === 'tall'}
        ref={this.handleContentRef}
        maxHeight={maxHeight}
      >
        {isLoading ? (
          <SpinnerContainer>
            <Spinner size="small" />
          </SpinnerContainer>
        ) : (
          <ThemeProvider theme={itemTheme}>
            <div>{children}</div>
          </ThemeProvider>
        )}
      </Content>
    ) : null;

    return (
      <Wrapper fit={shouldFitContainer} onClick={onClick} onKeyDown={onKeyDown}>
        <Layer
          autoFlip={shouldFlip}
          boundariesElement={boundariesElement}
          content={layerContent}
          offset={dropOffset}
          position={position}
          isAlwaysFixed={isOpen && isMenuFixed}
          onPositioned={onPositioned}
        >
          <Trigger fit={shouldFitContainer} ref={this.handleTriggerRef}>
            {trigger}
          </Trigger>
        </Layer>
      </Wrapper>
    );
  }
}

export { Droplist as DroplistWithoutAnalytics };
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'droplist',
  packageName: pkg.name,
  packageVersion: pkg.version,
})(
  withAnalyticsEvents({
    onOpenChange: createAndFireEventOnGuidu({
      action: 'toggled',
      actionSubject: 'droplist',

      attributes: {
        componentName: 'droplist',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),
  })(Droplist),
);
