// @flow

import React, { Children, Component, Fragment, type Node } from 'react';
import { canUseDOM } from 'exenv';
import { createPortal } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { TransitionGroup } from 'react-transition-group';
import {
  createAndFireEvent,
  withAnalyticsEvents,
  withAnalyticsContext,
  type WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import Blanket from '@atlaskit/blanket';
import {
  name as packageName,
  version as packageVersion,
} from '../../package.json';
import drawerItemTheme from '../theme/drawer-item-theme';
import DrawerPrimitive from './primitives';
import { Fade } from './transitions';
import type { CloseTrigger, DrawerProps } from './types';

const OnlyChild = ({ children }) => Children.toArray(children)[0] || null;

const createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

const createAndFireOnClick = (
  createAnalyticsEvent: $PropertyType<
    WithAnalyticsEventsProps,
    'createAnalyticsEvent',
  >,
  trigger: CloseTrigger,
) =>
  createAndFireEventOnAtlaskit({
    action: 'dismissed',
    actionSubject: 'drawer',
    attributes: {
      componentName: 'drawer',
      packageName,
      packageVersion,
      trigger,
    },
  })(createAnalyticsEvent);

export class DrawerBase extends Component<DrawerProps> {
  static defaultProps = {
    width: 'narrow',
  };

  body = canUseDOM ? document.querySelector('body') : undefined;

  componentDidMount() {
    const { isOpen } = this.props;

    if (isOpen) {
      window.addEventListener('keydown', this.handleKeyDown);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps: DrawerProps) {
    const { isOpen } = this.props;
    if (isOpen !== prevProps.isOpen) {
      if (isOpen) {
        window.addEventListener('keydown', this.handleKeyDown);
      } else {
        window.removeEventListener('keydown', this.handleKeyDown);
      }
    }
  }

  handleBlanketClick = (event: SyntheticMouseEvent<*>) => {
    this.handleClose(event, 'blanket');
  };

  handleBackButtonClick = (event: SyntheticMouseEvent<*>) => {
    this.handleClose(event, 'backButton');
  };

  handleClose = (
    event: SyntheticKeyboardEvent<*> | SyntheticMouseEvent<*>,
    trigger: CloseTrigger,
  ) => {
    const { createAnalyticsEvent, onClose } = this.props;

    const analyticsEvent = createAndFireOnClick(createAnalyticsEvent, trigger);

    if (onClose) {
      onClose(event, analyticsEvent);
    }
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<*>) => {
    const { isOpen, onKeyDown } = this.props;

    if (event.key === 'Escape' && isOpen) {
      this.handleClose(event, 'escKey');
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  render() {
    if (!this.body) {
      return null;
    }
    const {
      isOpen,
      children,
      icon,
      width,
      shouldUnmountOnExit,
      onCloseComplete,
    } = this.props;
    return createPortal(
      <TransitionGroup component={OnlyChild}>
        <Fragment>
          {/* $FlowFixMe the `in` prop is internal */}
          <Fade in={isOpen}>
            <Blanket isTinted onBlanketClicked={this.handleBlanketClick} />
          </Fade>
          <DrawerPrimitive
            icon={icon}
            in={isOpen}
            onClose={this.handleBackButtonClick}
            onCloseComplete={onCloseComplete}
            width={width}
            shouldUnmountOnExit={shouldUnmountOnExit}
          >
            {children}
          </DrawerPrimitive>
        </Fragment>
      </TransitionGroup>,
      this.body,
    );
  }
}

export const DrawerItemTheme = (props: { children: Node }) => (
  <ThemeProvider theme={drawerItemTheme}>{props.children}</ThemeProvider>
);

export default withAnalyticsContext({
  componentName: 'drawer',
  packageName,
  packageVersion,
})(withAnalyticsEvents()(DrawerBase));
