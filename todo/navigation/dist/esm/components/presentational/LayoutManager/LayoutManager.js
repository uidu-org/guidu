import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component, Fragment, PureComponent } from 'react';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import { colors } from '@atlaskit/theme';
import { name as packageName, version as packageVersion } from '../../../../package.json';
import { Shadow } from '../../../common/primitives';
import { light, ThemeProvider } from '../../../theme';
import ContentNavigation from './ContentNavigation';
import ResizeTransition, { isTransitioning } from './ResizeTransition';
import ResizeControl from './ResizeControl';
import { ContainerNavigationMask, ContentNavigationWrapper, LayoutContainer, NavigationContainer, PageWrapper } from './primitives';
import { CONTENT_NAV_WIDTH_COLLAPSED, CONTENT_NAV_WIDTH_FLYOUT, GLOBAL_NAV_WIDTH, FLYOUT_DELAY } from '../../../common/constants';
import RenderBlocker from '../../common/RenderBlocker';
import { LayoutEventListener } from './LayoutEvent';

function defaultTooltipContent(isCollapsed) {
  return isCollapsed ? {
    text: 'Expand',
    char: '['
  } : {
    text: 'Collapse',
    char: '['
  };
}

// FIXME: Move to separate file
// eslint-disable-next-line react/no-multi-comp
var PageInner =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PageInner, _PureComponent);

  function PageInner() {
    _classCallCheck(this, PageInner);

    return _possibleConstructorReturn(this, _getPrototypeOf(PageInner).apply(this, arguments));
  }

  _createClass(PageInner, [{
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return PageInner;
}(PureComponent); // FIXME: Move to separate file
// eslint-disable-next-line react/no-multi-comp


export var Page =
/*#__PURE__*/
function (_PureComponent2) {
  _inherits(Page, _PureComponent2);

  function Page() {
    _classCallCheck(this, Page);

    return _possibleConstructorReturn(this, _getPrototypeOf(Page).apply(this, arguments));
  }

  _createClass(Page, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          flyoutIsOpen = _this$props.flyoutIsOpen,
          innerRef = _this$props.innerRef,
          isResizing = _this$props.isResizing,
          isCollapsed = _this$props.isCollapsed,
          productNavWidth = _this$props.productNavWidth,
          onExpandStart = _this$props.onExpandStart,
          onExpandEnd = _this$props.onExpandEnd,
          onCollapseStart = _this$props.onCollapseStart,
          onCollapseEnd = _this$props.onCollapseEnd;
      return React.createElement(ResizeTransition, {
        from: [CONTENT_NAV_WIDTH_COLLAPSED],
        in: !isCollapsed,
        productNavWidth: productNavWidth,
        properties: ['paddingLeft'],
        to: [flyoutIsOpen ? CONTENT_NAV_WIDTH_FLYOUT : productNavWidth],
        userIsDragging: isResizing
        /* Attach expand/collapse callbacks to the page resize transition to ensure they are only
         * called when the nav is permanently expanded/collapsed, i.e. when page content position changes. */
        ,
        onExpandStart: onExpandStart,
        onExpandEnd: onExpandEnd,
        onCollapseStart: onCollapseStart,
        onCollapseEnd: onCollapseEnd
      }, function (_ref) {
        var transitionStyle = _ref.transitionStyle,
            transitionState = _ref.transitionState;
        return React.createElement(PageWrapper, {
          disableInteraction: isResizing || isTransitioning(transitionState),
          innerRef: innerRef,
          offset: GLOBAL_NAV_WIDTH,
          style: transitionStyle
        }, React.createElement(PageInner, null, _this.props.children));
      });
    }
  }]);

  return Page;
}(PureComponent);
/* NOTE: experimental props use an underscore */

/* eslint-disable camelcase */
// eslint-disable-next-line react/no-multi-comp

var LayoutManager =
/*#__PURE__*/
function (_Component) {
  _inherits(LayoutManager, _Component);

  function LayoutManager() {
    var _getPrototypeOf2;

    var _this2;

    _classCallCheck(this, LayoutManager);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LayoutManager)).call.apply(_getPrototypeOf2, [this].concat(_args)));
    _this2.state = {
      flyoutIsOpen: false,
      mouseIsOverNavigation: false,
      itemIsDragging: false
    };
    _this2.productNavRef = void 0;
    _this2.pageRef = void 0;
    _this2.containerRef = void 0;
    _this2.flyoutMouseOverTimeout = void 0;
    _this2.nodeRefs = {
      expandCollapseAffordance: React.createRef()
    };

    _this2.getContainerRef = function (ref) {
      _this2.containerRef = ref;
    };

    _this2.getNavRef = function (ref) {
      _this2.productNavRef = ref;
    };

    _this2.getPageRef = function (ref) {
      _this2.pageRef = ref;
    };

    _this2.mouseOutFlyoutArea = function (_ref2) {
      var currentTarget = _ref2.currentTarget,
          relatedTarget = _ref2.relatedTarget;
      if (currentTarget.contains(relatedTarget)) return;
      clearTimeout(_this2.flyoutMouseOverTimeout);

      _this2.setState({
        flyoutIsOpen: false
      });
    };

    _this2.mouseOverFlyoutArea = function (_ref3) {
      var currentTarget = _ref3.currentTarget,
          target = _ref3.target;
      if (!currentTarget.contains(target)) return;
      clearTimeout(_this2.flyoutMouseOverTimeout);
      _this2.flyoutMouseOverTimeout = setTimeout(function () {
        _this2.setState({
          flyoutIsOpen: true
        });
      }, FLYOUT_DELAY);
    };

    _this2.mouseEnter = function () {
      _this2.setState({
        mouseIsOverNavigation: true
      });
    };

    _this2.mouseLeave = function () {
      clearTimeout(_this2.flyoutMouseOverTimeout);

      _this2.setState({
        mouseIsOverNavigation: false
      });
    };

    _this2.onItemDragStart = function () {
      _this2.setState({
        itemIsDragging: true
      });
    };

    _this2.onItemDragEnd = function () {
      _this2.setState({
        itemIsDragging: false
      });
    };

    _this2.renderGlobalNavigation = function () {
      var _this2$props = _this2.props,
          containerNavigation = _this2$props.containerNavigation,
          GlobalNavigation = _this2$props.globalNavigation;
      return React.createElement(ThemeProvider, {
        theme: function theme(_theme) {
          return _objectSpread({
            mode: light
          }, _theme);
        }
      }, React.createElement(Fragment, null, React.createElement(Shadow, {
        isBold: !!containerNavigation,
        isOverDarkBg: true,
        style: {
          marginLeft: GLOBAL_NAV_WIDTH
        }
      }), React.createElement(GlobalNavigation, null)));
    };

    _this2.renderContentNavigation = function (args) {
      var transitionState = args.transitionState,
          transitionStyle = args.transitionStyle;
      var _this2$props2 = _this2.props,
          containerNavigation = _this2$props2.containerNavigation,
          experimental_flyoutOnHover = _this2$props2.experimental_flyoutOnHover,
          navigationUIController = _this2$props2.navigationUIController,
          productNavigation = _this2$props2.productNavigation;
      var _navigationUIControll = navigationUIController.state,
          isCollapsed = _navigationUIControll.isCollapsed,
          isPeekHinting = _navigationUIControll.isPeekHinting,
          isPeeking = _navigationUIControll.isPeeking,
          isResizing = _navigationUIControll.isResizing;
      var isVisible = transitionState !== 'exited';
      var shouldDisableInteraction = isResizing || isTransitioning(transitionState);
      return React.createElement(ContentNavigationWrapper, {
        key: "product-nav-wrapper",
        innerRef: _this2.getNavRef,
        disableInteraction: shouldDisableInteraction,
        style: transitionStyle
      }, React.createElement(ContentNavigation, {
        container: containerNavigation,
        isPeekHinting: isPeekHinting,
        isPeeking: isPeeking,
        isVisible: isVisible,
        key: "product-nav",
        product: productNavigation
      }), isCollapsed && !experimental_flyoutOnHover ? React.createElement("div", {
        "aria-label": "Click to expand the navigation",
        role: "button",
        onClick: navigationUIController.expand,
        css: {
          cursor: 'pointer',
          height: '100%',
          outline: 0,
          position: 'absolute',
          transition: 'background-color 100ms',
          width: CONTENT_NAV_WIDTH_COLLAPSED,
          ':hover': {
            backgroundColor: containerNavigation ? colors.N30 : 'rgba(255, 255, 255, 0.08)'
          },
          ':active': {
            backgroundColor: colors.N40A
          }
        },
        tabIndex: "0"
      }) : null);
    };

    _this2.renderNavigation = function () {
      var _this2$props3 = _this2.props,
          navigationUIController = _this2$props3.navigationUIController,
          experimental_flyoutOnHover = _this2$props3.experimental_flyoutOnHover;
      var _this2$state = _this2.state,
          flyoutIsOpen = _this2$state.flyoutIsOpen,
          mouseIsOverNavigation = _this2$state.mouseIsOverNavigation,
          itemIsDragging = _this2$state.itemIsDragging;
      var _navigationUIControll2 = navigationUIController.state,
          isCollapsed = _navigationUIControll2.isCollapsed,
          isResizeDisabled = _navigationUIControll2.isResizeDisabled,
          isResizing = _navigationUIControll2.isResizing,
          productNavWidth = _navigationUIControll2.productNavWidth;
      return React.createElement(LayoutEventListener, {
        onItemDragStart: _this2.onItemDragStart,
        onItemDragEnd: _this2.onItemDragEnd
      }, React.createElement(NavigationAnalyticsContext, {
        data: {
          attributes: {
            isExpanded: !isCollapsed,
            flyoutOnHoverEnabled: experimental_flyoutOnHover
          },
          componentName: 'navigation',
          packageName: packageName,
          packageVersion: packageVersion
        }
      }, React.createElement(ResizeTransition, {
        from: [CONTENT_NAV_WIDTH_COLLAPSED],
        in: !isCollapsed || flyoutIsOpen,
        properties: ['width'],
        to: [flyoutIsOpen ? CONTENT_NAV_WIDTH_FLYOUT : productNavWidth],
        userIsDragging: isResizing // only apply listeners to the NAV resize transition
        ,
        productNavWidth: productNavWidth
      }, function (_ref4) {
        var transitionStyle = _ref4.transitionStyle,
            transitionState = _ref4.transitionState;
        var onMouseOut = isCollapsed && experimental_flyoutOnHover && flyoutIsOpen ? _this2.mouseOutFlyoutArea : null;
        return React.createElement(NavigationContainer, {
          innerRef: _this2.getContainerRef,
          onMouseEnter: _this2.mouseEnter,
          onMouseOut: onMouseOut,
          onMouseLeave: _this2.mouseLeave
        }, React.createElement(ResizeControl, {
          collapseToggleTooltipContent: // $FlowFixMe
          _this2.props.collapseToggleTooltipContent,
          expandCollapseAffordanceRef: _this2.nodeRefs.expandCollapseAffordance,
          experimental_flyoutOnHover: experimental_flyoutOnHover,
          isDisabled: isResizeDisabled,
          flyoutIsOpen: flyoutIsOpen,
          isGrabAreaDisabled: itemIsDragging,
          mouseIsOverNavigation: mouseIsOverNavigation,
          mutationRefs: [{
            ref: _this2.pageRef,
            property: 'padding-left'
          }, {
            ref: _this2.productNavRef,
            property: 'width'
          }],
          navigation: navigationUIController
        }, function (_ref5) {
          var isDragging = _ref5.isDragging,
              width = _ref5.width;
          var onMouseOver = isCollapsed && experimental_flyoutOnHover && !flyoutIsOpen ? _this2.mouseOverFlyoutArea : null;
          return React.createElement(ContainerNavigationMask, {
            disableInteraction: itemIsDragging,
            onMouseOver: onMouseOver
          }, React.createElement(RenderBlocker, {
            blockOnChange: true,
            itemIsDragging: itemIsDragging
          }, _this2.renderGlobalNavigation(), _this2.renderContentNavigation({
            isDragging: isDragging,
            transitionState: transitionState,
            transitionStyle: transitionStyle,
            width: width
          })));
        }));
      })));
    };

    return _this2;
  }

  _createClass(LayoutManager, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.publishRefs();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.publishRefs();
    }
  }, {
    key: "publishRefs",
    value: function publishRefs() {
      var getRefs = this.props.getRefs;

      if (typeof getRefs === 'function') {
        getRefs(this.nodeRefs);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          navigationUIController = _this$props2.navigationUIController,
          onExpandStart = _this$props2.onExpandStart,
          onExpandEnd = _this$props2.onExpandEnd,
          onCollapseStart = _this$props2.onCollapseStart,
          onCollapseEnd = _this$props2.onCollapseEnd;
      var flyoutIsOpen = this.state.flyoutIsOpen;
      var _navigationUIControll3 = navigationUIController.state,
          isResizing = _navigationUIControll3.isResizing,
          isCollapsed = _navigationUIControll3.isCollapsed,
          productNavWidth = _navigationUIControll3.productNavWidth;
      return React.createElement(LayoutContainer, null, this.renderNavigation(), React.createElement(Page, {
        flyoutIsOpen: flyoutIsOpen,
        innerRef: this.getPageRef,
        isResizing: isResizing,
        isCollapsed: isCollapsed,
        productNavWidth: productNavWidth,
        onExpandStart: onExpandStart,
        onExpandEnd: onExpandEnd,
        onCollapseStart: onCollapseStart,
        onCollapseEnd: onCollapseEnd
      }, this.props.children));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      // kill the flyout when the user commits to expanding navigation
      if (!props.navigationUIController.state.isCollapsed && state.flyoutIsOpen) {
        return {
          flyoutIsOpen: false
        };
      }

      return null;
    }
  }]);

  return LayoutManager;
}(Component);

LayoutManager.defaultProps = {
  collapseToggleTooltipContent: defaultTooltipContent,
  experimental_flyoutOnHover: false
};
export { LayoutManager as default };