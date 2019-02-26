// @flow
import React, { Component } from 'react';
import { canUseDOM } from 'exenv';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@atlaskit/analytics-next';
import Blanket from '@atlaskit/blanket';

import {
  name as packageName,
  version as packageVersion,
} from '../../package.json';

import { WIDTH_ENUM } from '../shared-variables';

import {
  PositionerAbsolute,
  PositionerRelative,
  Dialog,
  FillScreen as StyledFillScreen,
} from '../styled/Modal';
import { Animation } from './Animation';
import Content from './Content';
import FocusLock from './FocusLock';
import { type Props as OuterProps } from './ModalWrapper';

export const Positioner = ({
  scrollBehavior,
  ...props
}: {
  scrollBehavior: void | 'inside' | 'outside',
}) => {
  const PositionComponent =
    scrollBehavior === 'inside' ? PositionerAbsolute : PositionerRelative;

  return <PositionComponent {...props} />;
};

function getScrollDistance() {
  return (
    window.pageYOffset ||
    (document.documentElement && document.documentElement.scrollTop) ||
    (document.body && document.body.scrollTop) ||
    0
  );
}

type Props = OuterProps & {
  /**
    Whether or not the dialog is visible
  */
  isOpen: boolean,
};

type State = {
  dialogNode: Node | null,
  scrollDistance: number,
};

class Modal extends Component<Props, State> {
  static defaultProps = {
    autoFocus: true,
    scrollBehavior: 'inside',
    shouldCloseOnEscapePress: true,
    shouldCloseOnOverlayClick: true,
    isChromeless: false,
    isOpen: true,
    stackIndex: 0,
    width: 'medium',
    isHeadingMultiline: true,
  };

  state = {
    dialogNode: null,
    scrollDistance: canUseDOM ? getScrollDistance() : 0,
    isExiting: false,
  };

  componentDidMount() {
    const scrollDistance = getScrollDistance();
    if (getScrollDistance() !== this.state.scrollDistance) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ scrollDistance });
    }
    window.addEventListener('scroll', this.handleWindowScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll);
  }

  /* Prevent window from being scrolled programatically so that the modal is positioned correctly
   * and to prevent scrollIntoView from scrolling the window.
   */
  handleWindowScroll = () => {
    if (getScrollDistance() !== this.state.scrollDistance) {
      window.scrollTo(window.pageXOffset, this.state.scrollDistance);
    }
  };

  handleOverlayClick = (e: SyntheticMouseEvent<>) => {
    if (this.props.shouldCloseOnOverlayClick) {
      this.props.onClose(e);
    }
  };

  render() {
    const {
      actions,
      appearance,
      autoFocus,
      body,
      children,
      components,
      footer,
      header,
      height,
      isChromeless,
      isHeadingMultiline,
      isOpen,
      onClose,
      onCloseComplete,
      onOpenComplete,
      onStackChange,
      shouldCloseOnEscapePress,
      stackIndex,
      heading,
      width,
      scrollBehavior,
    } = this.props;

    const { scrollDistance } = this.state;

    const isBackground = stackIndex != null && stackIndex > 0;

    // If a custom width (number or percentage) is supplied, set inline style
    // otherwise allow styled component to consume as named prop
    const widthName = WIDTH_ENUM.values.includes(width) ? width : null;
    const widthValue = widthName ? null : width;

    return (
      <Animation
        in={isOpen}
        onExited={onCloseComplete}
        onEntered={onOpenComplete}
        stackIndex={stackIndex}
      >
        {({ fade, slide }) => (
          <StyledFillScreen
            style={fade}
            aria-hidden={isBackground}
            scrollDistance={scrollDistance}
          >
            <FocusLock
              isEnabled={stackIndex === 0 && isOpen}
              autoFocus={autoFocus}
            >
              <Blanket isTinted onBlanketClicked={this.handleOverlayClick} />
              <Positioner
                style={slide}
                scrollBehavior={scrollBehavior}
                widthName={widthName}
                widthValue={widthValue}
              >
                <Dialog
                  heightValue={height}
                  isChromeless={isChromeless}
                  role="dialog"
                  tabIndex="-1"
                >
                  <Content
                    actions={actions}
                    appearance={appearance}
                    components={components}
                    footer={footer}
                    heading={heading}
                    isHeadingMultiline={isHeadingMultiline}
                    header={header}
                    onClose={onClose}
                    shouldScroll={scrollBehavior === 'inside'}
                    shouldCloseOnEscapePress={shouldCloseOnEscapePress}
                    onStackChange={onStackChange}
                    isChromeless={isChromeless}
                    stackIndex={stackIndex}
                    body={body}
                  >
                    {children}
                  </Content>
                </Dialog>
              </Positioner>
            </FocusLock>
          </StyledFillScreen>
        )}
      </Animation>
    );
  }
}

const createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

export const ModalDialogWithoutAnalytics = Modal;

export default withAnalyticsContext({
  componentName: 'modalDialog',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onClose: createAndFireEventOnAtlaskit({
      action: 'closed',
      actionSubject: 'modalDialog',

      attributes: {
        componentName: 'modalDialog',
        packageName,
        packageVersion,
      },
    }),
  })(Modal),
);
