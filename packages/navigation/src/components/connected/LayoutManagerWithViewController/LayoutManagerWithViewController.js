// @flow

import React, { Component, Fragment } from 'react';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';

import ViewRenderer from '../../../renderer';
import { withNavigationUI } from '../../../ui-controller';
import { withNavigationViewController } from '../../../view-controller';
import LayoutManager from '../../presentational/LayoutManager';
import SkeletonContainerView from '../../presentational/SkeletonContainerView';
import type {
  LayoutManagerWithViewControllerProps,
  LayoutManagerWithViewControllerState,
} from './types';
import LayerInitialised from './LayerInitialised';
import {
  ProductNavigationTheme,
  ContainerNavigationTheme,
} from '../../presentational/LayoutManager/ContentNavigation/primitives';

/* NOTE: experimental props use an underscore */
/* eslint-disable camelcase */

class LayoutManagerWithViewControllerBase extends Component<
  LayoutManagerWithViewControllerProps,
  LayoutManagerWithViewControllerState,
> {
  state = {
    hasInitialised: false,
  };

  constructor(props: LayoutManagerWithViewControllerProps) {
    super(props);
    this.renderContainerNavigation.displayName = 'ContainerNavigationRenderer';
    this.renderProductNavigation.displayName = 'ProductNavigationRenderer';
  }

  onInitialised = () => {
    this.setState({
      hasInitialised: true,
    });
  };

  renderSkeleton = () => {
    const { firstSkeletonToRender } = this.props;
    let Wrapper;

    if (firstSkeletonToRender === 'product' && !this.state.hasInitialised) {
      Wrapper = ProductNavigationTheme;
    } else if (
      firstSkeletonToRender === 'container' &&
      !this.state.hasInitialised
    ) {
      Wrapper = ContainerNavigationTheme;
    } else {
      Wrapper = Fragment;
    }

    return (
      <Wrapper>
        <SkeletonContainerView />
      </Wrapper>
    );
  };

  renderContainerNavigation = () => {
    const {
      navigationViewController: {
        state: { activeView },
      },
      firstSkeletonToRender,
    } = this.props;

    if (activeView && activeView.type === 'container') {
      return this.renderView(activeView);
    }

    if (
      !activeView &&
      firstSkeletonToRender === 'container' &&
      !this.state.hasInitialised
    ) {
      return this.renderSkeleton();
    }

    return firstSkeletonToRender !== 'container' ? null : this.renderSkeleton();
  };

  renderGlobalNavigation = () => {
    const {
      globalNavigation: GlobalNavigation,
      navigationViewController: {
        state: { activeView },
      },
    } = this.props;
    const { hasInitialised } = this.state;

    /* We are embedding the LayerInitialised analytics component within global navigation so that
     * the event it fires can access the analytics context within LayerManager. The component
     * cannot be rendered directly within LayerManager since it needs access to view data which
     * only exists in LayoutManagerWithViewController. */
    return (
      <Fragment>
        <GlobalNavigation />
        <LayerInitialised
          activeView={activeView}
          initialised={hasInitialised}
          onInitialised={this.onInitialised}
        />
      </Fragment>
    );
  };

  renderProductNavigation = () => {
    const {
      navigationUIController: {
        state: { isPeeking },
      },
      navigationViewController: {
        state: { activeView, activePeekView },
      },
    } = this.props;

    if (
      activePeekView &&
      (isPeeking || (activeView && activeView.type === 'container'))
    ) {
      return this.renderView(activePeekView);
    }
    if (activeView && activeView.type === 'product') {
      return this.renderView(activeView);
    }

    return this.renderSkeleton();
  };

  renderView(view) {
    const { customComponents } = this.props;
    return (
      <ViewRenderer customComponents={customComponents} items={view.data} />
    );
  }

  render() {
    const {
      children,
      experimental_flyoutOnHover,
      navigationViewController: {
        state: { activeView },
      },
      firstSkeletonToRender,
      onExpandStart,
      onExpandEnd,
      onCollapseStart,
      onCollapseEnd,
      getRefs,
    } = this.props;

    return (
      <NavigationAnalyticsContext
        data={{
          attributes: {
            navigationLayer: activeView && activeView.type,
            view: activeView && activeView.id,
            ...(activeView && activeView.analyticsAttributes),
          },
        }}
      >
        <LayoutManager
          globalNavigation={this.renderGlobalNavigation}
          containerNavigation={
            (activeView && activeView.type === 'container') ||
            (!activeView &&
              firstSkeletonToRender === 'container' &&
              !this.state.hasInitialised)
              ? this.renderContainerNavigation
              : null
          }
          experimental_flyoutOnHover={experimental_flyoutOnHover}
          productNavigation={this.renderProductNavigation}
          onExpandStart={onExpandStart}
          onExpandEnd={onExpandEnd}
          onCollapseStart={onCollapseStart}
          onCollapseEnd={onCollapseEnd}
          getRefs={getRefs}
        >
          {children}
        </LayoutManager>
      </NavigationAnalyticsContext>
    );
  }
}

export default withNavigationUI(
  withNavigationViewController(LayoutManagerWithViewControllerBase),
);
