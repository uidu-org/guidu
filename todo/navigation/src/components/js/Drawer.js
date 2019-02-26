// @flow

import React, { PureComponent, type Node } from 'react';
import Blanket from '@atlaskit/blanket';
import { withAnalytics } from '@atlaskit/analytics';
import ScrollLock from 'react-scrolllock';
import DrawerTrigger from './DrawerTrigger';
import DrawerBackIcon from './DrawerBackIcon';
import ContainerHeader from './ContainerHeader';
import DrawerSide from '../styled/DrawerSide';
import DrawerInner from '../styled/DrawerInner';
import DrawerPrimaryIcon from '../styled/DrawerPrimaryIcon';
import DrawerMain from '../styled/DrawerMain';
import DrawerContent from '../styled/DrawerContent';
import DrawerBackIconWrapper from '../styled/DrawerBackIconWrapper';
import { WithRootTheme } from '../../theme/util';
import { container } from '../../theme/presets';

const escKeyCode = 27;
export const analyticsNamespace = 'atlaskit.navigation.drawer';

type Props = {
  /** The icon to use as the back icon for this drawer */
  backIcon: Node,
  /** The drawer contents */
  children?: Node,
  /** The header for this Drawer – often the ContainerTitle for a given Container */
  header?: Node,
  /** Distance to offset the drawer contents and back icon from the top in px */
  iconOffset: number,
  /** Set whether the drawer is visible. */
  isOpen: boolean,
  /** A function to call when the backIcon button is clicked, the blanket
   behind the Drawer is clicked or the escape key is pressed */
  onBackButton: (
    event: SyntheticMouseEvent<*> | SyntheticKeyboardEvent<*> | KeyboardEvent,
    data?: {},
  ) => void,
  /** Standard onKeyDown callback */
  onKeyDown?: (event: KeyboardEvent, data?: {}) => void,
  /** The primary icon in the Drawer – usually the globalPrimaryIcon that was
   given to the GlobalNavigation component */
  primaryIcon: Node,
  /** Controls the width of the drawer */
  width: 'narrow' | 'medium' | 'wide' | 'full',
  /** Fires anayltics event. Injected by withAnalytics. */
  fireAnalyticsEvent: (eventName: string, eventData?: Object) => void,
};

type State = {
  isAnimating: boolean,
};

export class DrawerImpl extends PureComponent<Props, State> {
  static defaultProps = {
    iconOffset: 0,
    isOpen: false,
    onBackButton: () => {},
    primaryIcon: null,
    width: 'narrow',
  };

  state = {
    isAnimating: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isOpen !== this.props.isOpen) {
      this.setState({ isAnimating: true });
    }
  }

  componentDidUpdate(prevProps: Props) {
    // Fire analytics event upon drawer opening
    if (!prevProps.isOpen && this.props.isOpen) {
      this.props.fireAnalyticsEvent('open');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  // eslint-disable-next-line react/sort-comp
  createBackButtonHandler = (method: string) => (
    e: SyntheticMouseEvent<*> | SyntheticKeyboardEvent<*> | KeyboardEvent,
  ) => {
    if (this.props.isOpen) {
      this.props.onBackButton(e);
      this.props.fireAnalyticsEvent('close', { method });
    }
  };

  onBackButtonByBackButton = this.createBackButtonHandler('back-btn');
  onBackButtonByBlanket = this.createBackButtonHandler('blanket');
  onBackButtonByEscKey = this.createBackButtonHandler('esc-key');

  handleKeyDown = (event: KeyboardEvent) => {
    // The reason we have onKeyDown living together with onBackButton is because
    // some apps living in Focused task need the ability to handle on key down by itself.
    // However, some other apps don't really care about it
    // and leave it to the Focused task to handle.
    // Calling onKeyDown first can either supplement or override onBackButton.
    const { onKeyDown } = this.props;
    if (onKeyDown) {
      onKeyDown(event);
    }
    if (!event.defaultPrevented && event.keyCode === escKeyCode) {
      this.onBackButtonByEscKey(event);
    }
  };

  handleAnimationEnd = () => this.setState({ isAnimating: false });

  render() {
    const {
      backIcon,
      header,
      isOpen,
      primaryIcon,
      width,
      iconOffset,
    } = this.props;

    const actualFullWidth = width === 'full';

    const sidebar = isOpen ? (
      <DrawerSide>
        <DrawerPrimaryIcon>{primaryIcon}</DrawerPrimaryIcon>
        <DrawerBackIconWrapper iconOffset={iconOffset}>
          <DrawerTrigger onActivate={this.onBackButtonByBackButton}>
            <DrawerBackIcon isVisible={isOpen}>{backIcon}</DrawerBackIcon>
          </DrawerTrigger>
        </DrawerBackIconWrapper>
      </DrawerSide>
    ) : null;

    const content = isOpen ? (
      <DrawerMain>
        <ContainerHeader
          isInDrawer
          iconOffset={iconOffset}
          isFullWidth={actualFullWidth}
        >
          {width !== 'full' ? header : <ScrollLock />}
        </ContainerHeader>
        <DrawerContent>{this.props.children}</DrawerContent>
      </DrawerMain>
    ) : null;

    // Note: even though we are using WithRootTheme here, the Drawer appearance is not able
    // to be customised via a preset or custom theme.
    return (
      <WithRootTheme provided={container}>
        <div>
          <Blanket
            isTinted={isOpen}
            canClickThrough={!isOpen}
            onBlanketClicked={this.onBackButtonByBlanket}
          />
          {(this.state.isAnimating || isOpen) && (
            <DrawerInner
              isOpen={isOpen}
              width={width}
              isAnimating={this.state.isAnimating}
              onAnimationEnd={this.handleAnimationEnd}
            >
              {sidebar}
              {content}
            </DrawerInner>
          )}
        </div>
      </WithRootTheme>
    );
  }
}

export default withAnalytics(
  DrawerImpl,
  {},
  { analyticsId: analyticsNamespace },
);
