import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import Blanket from '@uidu/blanket';
import { AtlaskitThemeProvider } from '@uidu/theme';
import { canUseDOM } from 'exenv';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { TransitionGroup } from 'react-transition-group';
import drawerItemTheme from '../theme/drawer-item-theme';
import { CloseTrigger, DrawerProps } from '../types';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';
import DrawerPrimitive from './DrawerPrimitive';
import { Fade } from './transitions';

const OnlyChild = ({ children }) => React.Children.toArray(children)[0] || null;

const createAndFireEventOnAtlaskit = createAndFireEvent('uidu');

const createAndFireOnClick = (
  createAnalyticsEvent: any,
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

export class DrawerBase extends React.Component<DrawerProps> {
  static defaultProps = {
    width: 'narrow',
    origin: 'left',
  };

  body = canUseDOM ? document.querySelector('body') : undefined;

  componentDidMount() {
    const { isOpen } = this.props;

    if (isOpen) {
      window.addEventListener('keydown', this.handleKeyDown as any);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown as any);
  }

  componentDidUpdate(prevProps: DrawerProps) {
    const { isOpen } = this.props;
    if (isOpen !== prevProps.isOpen) {
      if (isOpen) {
        window.addEventListener('keydown', this.handleKeyDown as any);
      } else {
        window.removeEventListener('keydown', this.handleKeyDown as any);
      }
    }
  }

  handleBlanketClick = (event: React.MouseEvent) => {
    this.handleClose(event, 'blanket');
  };

  handleBackButtonClick = (event: React.MouseEvent) => {
    this.handleClose(event, 'backButton');
  };

  handleClose = (
    event: React.KeyboardEvent | React.MouseEvent,
    trigger: CloseTrigger,
  ) => {
    const { createAnalyticsEvent, onClose } = this.props;

    const analyticsEvent = createAndFireOnClick(createAnalyticsEvent, trigger);

    if (onClose) {
      onClose(event, analyticsEvent);
    }
  };

  handleKeyDown = (event: React.KeyboardEvent) => {
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
      size,
      shouldUnmountOnExit,
      onCloseComplete,
      origin,
      isStacked,
    } = this.props;

    return createPortal(
      <TransitionGroup component={OnlyChild}>
        <>
          <Fade in={isOpen} origin={origin} isStacked={isStacked}>
            <Blanket
              isStacked={isStacked}
              isTinted
              onBlanketClicked={this.handleBlanketClick}
            />
          </Fade>
          <DrawerPrimitive
            icon={icon}
            in={isOpen}
            onClose={this.handleBackButtonClick}
            onCloseComplete={onCloseComplete}
            size={size}
            shouldUnmountOnExit={shouldUnmountOnExit}
            origin={origin}
            isStacked={isStacked}
          >
            {children}
          </DrawerPrimitive>
        </>
      </TransitionGroup>,
      this.body,
    );
  }
}

export const DrawerItemTheme = (props: { children: React.ReactNode }) => (
  <AtlaskitThemeProvider theme={drawerItemTheme}>
    {props.children}
  </AtlaskitThemeProvider>
);

export default withAnalyticsContext({
  componentName: 'drawer',
  packageName,
  packageVersion,
})(withAnalyticsEvents()(DrawerBase));
