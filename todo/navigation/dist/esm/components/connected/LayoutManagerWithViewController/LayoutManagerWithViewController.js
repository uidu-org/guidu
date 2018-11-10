import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component, Fragment } from 'react';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import ViewRenderer from '../../../renderer';
import { withNavigationUI } from '../../../ui-controller';
import { withNavigationViewController } from '../../../view-controller';
import LayoutManager from '../../presentational/LayoutManager';
import SkeletonContainerView from '../../presentational/SkeletonContainerView';
import LayerInitialised from './LayerInitialised';
import { ProductNavigationTheme, ContainerNavigationTheme } from '../../presentational/LayoutManager/ContentNavigation/primitives';
/* NOTE: experimental props use an underscore */

/* eslint-disable camelcase */

var LayoutManagerWithViewControllerBase =
/*#__PURE__*/
function (_Component) {
  _inherits(LayoutManagerWithViewControllerBase, _Component);

  function LayoutManagerWithViewControllerBase(props) {
    var _this;

    _classCallCheck(this, LayoutManagerWithViewControllerBase);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LayoutManagerWithViewControllerBase).call(this, props));
    _this.state = {
      hasInitialised: false
    };

    _this.onInitialised = function () {
      _this.setState({
        hasInitialised: true
      });
    };

    _this.renderSkeleton = function () {
      var firstSkeletonToRender = _this.props.firstSkeletonToRender;
      var Wrapper;

      if (firstSkeletonToRender === 'product' && !_this.state.hasInitialised) {
        Wrapper = ProductNavigationTheme;
      } else if (firstSkeletonToRender === 'container' && !_this.state.hasInitialised) {
        Wrapper = ContainerNavigationTheme;
      } else {
        Wrapper = Fragment;
      }

      return React.createElement(Wrapper, null, React.createElement(SkeletonContainerView, null));
    };

    _this.renderContainerNavigation = function () {
      var _this$props = _this.props,
          activeView = _this$props.navigationViewController.state.activeView,
          firstSkeletonToRender = _this$props.firstSkeletonToRender;

      if (activeView && activeView.type === 'container') {
        return _this.renderView(activeView);
      }

      if (!activeView && firstSkeletonToRender === 'container' && !_this.state.hasInitialised) {
        return _this.renderSkeleton();
      }

      return firstSkeletonToRender !== 'container' ? null : _this.renderSkeleton();
    };

    _this.renderGlobalNavigation = function () {
      var _this$props2 = _this.props,
          GlobalNavigation = _this$props2.globalNavigation,
          activeView = _this$props2.navigationViewController.state.activeView;
      var hasInitialised = _this.state.hasInitialised;
      /* We are embedding the LayerInitialised analytics component within global navigation so that
       * the event it fires can access the analytics context within LayerManager. The component
       * cannot be rendered directly within LayerManager since it needs access to view data which
       * only exists in LayoutManagerWithViewController. */

      return React.createElement(Fragment, null, React.createElement(GlobalNavigation, null), React.createElement(LayerInitialised, {
        activeView: activeView,
        initialised: hasInitialised,
        onInitialised: _this.onInitialised
      }));
    };

    _this.renderProductNavigation = function () {
      var _this$props3 = _this.props,
          isPeeking = _this$props3.navigationUIController.state.isPeeking,
          _this$props3$navigati = _this$props3.navigationViewController.state,
          activeView = _this$props3$navigati.activeView,
          activePeekView = _this$props3$navigati.activePeekView;

      if (activePeekView && (isPeeking || activeView && activeView.type === 'container')) {
        return _this.renderView(activePeekView);
      }

      if (activeView && activeView.type === 'product') {
        return _this.renderView(activeView);
      }

      return _this.renderSkeleton();
    };

    _this.renderContainerNavigation.displayName = 'ContainerNavigationRenderer';
    _this.renderProductNavigation.displayName = 'ProductNavigationRenderer';
    return _this;
  }

  _createClass(LayoutManagerWithViewControllerBase, [{
    key: "renderView",
    value: function renderView(view) {
      var customComponents = this.props.customComponents;
      return React.createElement(ViewRenderer, {
        customComponents: customComponents,
        items: view.data
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          children = _this$props4.children,
          experimental_flyoutOnHover = _this$props4.experimental_flyoutOnHover,
          activeView = _this$props4.navigationViewController.state.activeView,
          firstSkeletonToRender = _this$props4.firstSkeletonToRender,
          onExpandStart = _this$props4.onExpandStart,
          onExpandEnd = _this$props4.onExpandEnd,
          onCollapseStart = _this$props4.onCollapseStart,
          onCollapseEnd = _this$props4.onCollapseEnd,
          getRefs = _this$props4.getRefs;
      return React.createElement(NavigationAnalyticsContext, {
        data: {
          attributes: _objectSpread({
            navigationLayer: activeView && activeView.type,
            view: activeView && activeView.id
          }, activeView && activeView.analyticsAttributes)
        }
      }, React.createElement(LayoutManager, {
        globalNavigation: this.renderGlobalNavigation,
        containerNavigation: activeView && activeView.type === 'container' || !activeView && firstSkeletonToRender === 'container' && !this.state.hasInitialised ? this.renderContainerNavigation : null,
        experimental_flyoutOnHover: experimental_flyoutOnHover,
        productNavigation: this.renderProductNavigation,
        onExpandStart: onExpandStart,
        onExpandEnd: onExpandEnd,
        onCollapseStart: onCollapseStart,
        onCollapseEnd: onCollapseEnd,
        getRefs: getRefs
      }, children));
    }
  }]);

  return LayoutManagerWithViewControllerBase;
}(Component);

export default withNavigationUI(withNavigationViewController(LayoutManagerWithViewControllerBase));