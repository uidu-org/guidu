// @flow

import React, { Component } from 'react';
import MenuIcon from '@atlaskit/icon/glyph/menu';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';

import { GlobalItemPrimitive } from '../../../';
import InteractionStateManager from '../InteractionStateManager';
import { UIController, UIControllerSubscriber } from '../../../ui-controller';
import {
  ViewController,
  withNavigationViewController,
} from '../../../view-controller';

type PeekToggleProps = {
  label: string,
  tooltip: string,
  isPeeking: boolean,
  navigationUIController: UIController,
  navigationViewController: ViewController,
};

class PeekToggle extends Component<PeekToggleProps> {
  static defaultProps = {
    label: 'Main menu',
    tooltip: 'Main menu',
  };

  getIsHomeViewActive() {
    const {
      activeView,
      activePeekView,
    } = this.props.navigationViewController.state;
    if (!activeView || !activePeekView) {
      return false;
    }
    return activeView.id === activePeekView.id;
  }

  handleClick = () => {
    const {
      isPeeking,
      navigationUIController,
      navigationViewController,
    } = this.props;
    if (!isPeeking && navigationViewController.initialPeekViewId) {
      navigationViewController.setPeekView(
        navigationViewController.initialPeekViewId,
      );
    }
    navigationUIController.togglePeek();
  };

  renderIcon = () => (this.props.isPeeking ? ArrowLeftIcon : MenuIcon);

  renderComponent = ({ className, children }) => {
    const isHomeViewActive = this.getIsHomeViewActive();
    const { isPeeking, navigationUIController } = this.props;

    return (
      <button
        className={className}
        onClick={isHomeViewActive && !isPeeking ? null : this.handleClick}
        onMouseEnter={navigationUIController.peekHint}
        onMouseLeave={navigationUIController.unPeekHint}
      >
        {children}
      </button>
    );
  };

  render() {
    const { label, tooltip } = this.props;
    const { isPeeking } = this.props;
    const isHomeViewActive = this.getIsHomeViewActive();

    return (
      <InteractionStateManager>
        {({ isActive, isHover }) => (
          <GlobalItemPrimitive
            isActive={isActive}
            component={this.renderComponent}
            icon={this.renderIcon()}
            isHover={isHover || isHomeViewActive || isPeeking}
            label={label}
            tooltip={!isHomeViewActive && !isPeeking && tooltip}
          />
        )}
      </InteractionStateManager>
    );
  }
}

const PeekToggleWithUIController = (props: *) => (
  <UIControllerSubscriber>
    {navigationUIController => (
      <PeekToggle
        isPeeking={navigationUIController.state.isPeeking}
        navigationUIController={navigationUIController}
        {...props}
      />
    )}
  </UIControllerSubscriber>
);

export default withNavigationViewController(PeekToggleWithUIController);
