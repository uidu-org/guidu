// @flow

import React, { Component } from 'react';
import ArrowRightCircleIcon from '@atlaskit/icon/glyph/arrow-right-circle';
import Spinner from '@atlaskit/spinner';

import { withNavigationUI } from '../../../ui-controller';
import { withNavigationViewController } from '../../../view-controller';
import ConnectedItem from '../ConnectedItem';

import type { GoToItemProps } from './types';
import type { InteractionState } from '../../presentational/InteractionStateManager/types';

const generateAfterProp = ({
  goTo,
  spinnerDelay,
  navigationViewController,
}) => ({ isActive, isHover, isFocused }: InteractionState) => {
  const { incomingView } = navigationViewController.state;
  if (incomingView && incomingView.id === goTo) {
    return <Spinner delay={spinnerDelay} invertColor size="small" />;
  }
  if (isActive || isHover || isFocused) {
    return (
      <ArrowRightCircleIcon
        primaryColor="currentColor"
        secondaryColor="inherit"
      />
    );
  }
  return null;
};

class GoToItem extends Component<GoToItemProps> {
  static defaultProps = {
    spinnerDelay: 200,
  };

  handleClick = (e: SyntheticEvent<HTMLElement>) => {
    const {
      goTo,
      navigationViewController,
      navigationUIController,
    } = this.props;
    const { activeView } = navigationViewController.state;

    e.preventDefault();

    if (typeof goTo !== 'string') {
      return;
    }

    if (navigationUIController.state.isPeeking) {
      if (activeView && goTo === activeView.id) {
        // If we're peeking and goTo points to the active view, unpeek.
        navigationUIController.unPeek();
      } else {
        // If we're peeking and goTo does not point to the active view, update
        // the peek view.
        navigationViewController.setPeekView(goTo);
      }
    } else {
      // If we're not peeking, update the active view.
      navigationViewController.setView(goTo);
    }
  };

  render() {
    const {
      after: afterProp,
      goTo,
      navigationUIController,
      navigationViewController,
      spinnerDelay,
      ...rest
    } = this.props;
    const after =
      typeof afterProp === 'undefined'
        ? generateAfterProp({ goTo, spinnerDelay, navigationViewController })
        : afterProp;
    const props = { ...rest, after };
    return <ConnectedItem onClick={this.handleClick} {...props} />;
  }
}

export { GoToItem as GoToItemBase };

export default withNavigationUI(withNavigationViewController(GoToItem));
