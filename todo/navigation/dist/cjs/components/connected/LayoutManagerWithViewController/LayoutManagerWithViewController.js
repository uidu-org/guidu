"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _analyticsNamespacedContext = require("@atlaskit/analytics-namespaced-context");

var _renderer = _interopRequireDefault(require("../../../renderer"));

var _uiController = require("../../../ui-controller");

var _viewController = require("../../../view-controller");

var _LayoutManager = _interopRequireDefault(require("../../presentational/LayoutManager"));

var _SkeletonContainerView = _interopRequireDefault(require("../../presentational/SkeletonContainerView"));

var _LayerInitialised = _interopRequireDefault(require("./LayerInitialised"));

var _primitives = require("../../presentational/LayoutManager/ContentNavigation/primitives");

/* NOTE: experimental props use an underscore */

/* eslint-disable camelcase */
var LayoutManagerWithViewControllerBase =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(LayoutManagerWithViewControllerBase, _Component);

  function LayoutManagerWithViewControllerBase(props) {
    var _this;

    (0, _classCallCheck2.default)(this, LayoutManagerWithViewControllerBase);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LayoutManagerWithViewControllerBase).call(this, props));
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
        Wrapper = _primitives.ProductNavigationTheme;
      } else if (firstSkeletonToRender === 'container' && !_this.state.hasInitialised) {
        Wrapper = _primitives.ContainerNavigationTheme;
      } else {
        Wrapper = _react.Fragment;
      }

      return _react.default.createElement(Wrapper, null, _react.default.createElement(_SkeletonContainerView.default, null));
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

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(GlobalNavigation, null), _react.default.createElement(_LayerInitialised.default, {
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

  (0, _createClass2.default)(LayoutManagerWithViewControllerBase, [{
    key: "renderView",
    value: function renderView(view) {
      var customComponents = this.props.customComponents;
      return _react.default.createElement(_renderer.default, {
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
      return _react.default.createElement(_analyticsNamespacedContext.NavigationAnalyticsContext, {
        data: {
          attributes: (0, _objectSpread2.default)({
            navigationLayer: activeView && activeView.type,
            view: activeView && activeView.id
          }, activeView && activeView.analyticsAttributes)
        }
      }, _react.default.createElement(_LayoutManager.default, {
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
}(_react.Component);

var _default = (0, _uiController.withNavigationUI)((0, _viewController.withNavigationViewController)(LayoutManagerWithViewControllerBase));

exports.default = _default;
module.exports = exports.default;