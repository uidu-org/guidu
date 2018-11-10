"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Page = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _analyticsNamespacedContext = require("@atlaskit/analytics-namespaced-context");

var _theme2 = require("@atlaskit/theme");

var _package = require("../../../../package.json");

var _primitives = require("../../../common/primitives");

var _theme3 = require("../../../theme");

var _ContentNavigation = _interopRequireDefault(require("./ContentNavigation"));

var _ResizeTransition = _interopRequireWildcard(require("./ResizeTransition"));

var _ResizeControl = _interopRequireDefault(require("./ResizeControl"));

var _primitives2 = require("./primitives");

var _constants = require("../../../common/constants");

var _RenderBlocker = _interopRequireDefault(require("../../common/RenderBlocker"));

var _LayoutEvent = require("./LayoutEvent");

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
  (0, _inherits2.default)(PageInner, _PureComponent);

  function PageInner() {
    (0, _classCallCheck2.default)(this, PageInner);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(PageInner).apply(this, arguments));
  }

  (0, _createClass2.default)(PageInner, [{
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);
  return PageInner;
}(_react.PureComponent); // FIXME: Move to separate file
// eslint-disable-next-line react/no-multi-comp


var Page =
/*#__PURE__*/
function (_PureComponent2) {
  (0, _inherits2.default)(Page, _PureComponent2);

  function Page() {
    (0, _classCallCheck2.default)(this, Page);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(Page).apply(this, arguments));
  }

  (0, _createClass2.default)(Page, [{
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
      return _react.default.createElement(_ResizeTransition.default, {
        from: [_constants.CONTENT_NAV_WIDTH_COLLAPSED],
        in: !isCollapsed,
        productNavWidth: productNavWidth,
        properties: ['paddingLeft'],
        to: [flyoutIsOpen ? _constants.CONTENT_NAV_WIDTH_FLYOUT : productNavWidth],
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
        return _react.default.createElement(_primitives2.PageWrapper, {
          disableInteraction: isResizing || (0, _ResizeTransition.isTransitioning)(transitionState),
          innerRef: innerRef,
          offset: _constants.GLOBAL_NAV_WIDTH,
          style: transitionStyle
        }, _react.default.createElement(PageInner, null, _this.props.children));
      });
    }
  }]);
  return Page;
}(_react.PureComponent);
/* NOTE: experimental props use an underscore */

/* eslint-disable camelcase */
// eslint-disable-next-line react/no-multi-comp


exports.Page = Page;

var LayoutManager =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(LayoutManager, _Component);

  function LayoutManager() {
    var _getPrototypeOf2;

    var _this2;

    (0, _classCallCheck2.default)(this, LayoutManager);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this2 = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(LayoutManager)).call.apply(_getPrototypeOf2, [this].concat(_args)));
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
      expandCollapseAffordance: _react.default.createRef()
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
      }, _constants.FLYOUT_DELAY);
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
      return _react.default.createElement(_theme3.ThemeProvider, {
        theme: function theme(_theme) {
          return (0, _objectSpread2.default)({
            mode: _theme3.light
          }, _theme);
        }
      }, _react.default.createElement(_react.Fragment, null, _react.default.createElement(_primitives.Shadow, {
        isBold: !!containerNavigation,
        isOverDarkBg: true,
        style: {
          marginLeft: _constants.GLOBAL_NAV_WIDTH
        }
      }), _react.default.createElement(GlobalNavigation, null)));
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
      var shouldDisableInteraction = isResizing || (0, _ResizeTransition.isTransitioning)(transitionState);
      return _react.default.createElement(_primitives2.ContentNavigationWrapper, {
        key: "product-nav-wrapper",
        innerRef: _this2.getNavRef,
        disableInteraction: shouldDisableInteraction,
        style: transitionStyle
      }, _react.default.createElement(_ContentNavigation.default, {
        container: containerNavigation,
        isPeekHinting: isPeekHinting,
        isPeeking: isPeeking,
        isVisible: isVisible,
        key: "product-nav",
        product: productNavigation
      }), isCollapsed && !experimental_flyoutOnHover ? _react.default.createElement("div", {
        "aria-label": "Click to expand the navigation",
        role: "button",
        onClick: navigationUIController.expand,
        css: {
          cursor: 'pointer',
          height: '100%',
          outline: 0,
          position: 'absolute',
          transition: 'background-color 100ms',
          width: _constants.CONTENT_NAV_WIDTH_COLLAPSED,
          ':hover': {
            backgroundColor: containerNavigation ? _theme2.colors.N30 : 'rgba(255, 255, 255, 0.08)'
          },
          ':active': {
            backgroundColor: _theme2.colors.N40A
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
      return _react.default.createElement(_LayoutEvent.LayoutEventListener, {
        onItemDragStart: _this2.onItemDragStart,
        onItemDragEnd: _this2.onItemDragEnd
      }, _react.default.createElement(_analyticsNamespacedContext.NavigationAnalyticsContext, {
        data: {
          attributes: {
            isExpanded: !isCollapsed,
            flyoutOnHoverEnabled: experimental_flyoutOnHover
          },
          componentName: 'navigation',
          packageName: _package.name,
          packageVersion: _package.version
        }
      }, _react.default.createElement(_ResizeTransition.default, {
        from: [_constants.CONTENT_NAV_WIDTH_COLLAPSED],
        in: !isCollapsed || flyoutIsOpen,
        properties: ['width'],
        to: [flyoutIsOpen ? _constants.CONTENT_NAV_WIDTH_FLYOUT : productNavWidth],
        userIsDragging: isResizing // only apply listeners to the NAV resize transition
        ,
        productNavWidth: productNavWidth
      }, function (_ref4) {
        var transitionStyle = _ref4.transitionStyle,
            transitionState = _ref4.transitionState;
        var onMouseOut = isCollapsed && experimental_flyoutOnHover && flyoutIsOpen ? _this2.mouseOutFlyoutArea : null;
        return _react.default.createElement(_primitives2.NavigationContainer, {
          innerRef: _this2.getContainerRef,
          onMouseEnter: _this2.mouseEnter,
          onMouseOut: onMouseOut,
          onMouseLeave: _this2.mouseLeave
        }, _react.default.createElement(_ResizeControl.default, {
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
          return _react.default.createElement(_primitives2.ContainerNavigationMask, {
            disableInteraction: itemIsDragging,
            onMouseOver: onMouseOver
          }, _react.default.createElement(_RenderBlocker.default, {
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

  (0, _createClass2.default)(LayoutManager, [{
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
      return _react.default.createElement(_primitives2.LayoutContainer, null, this.renderNavigation(), _react.default.createElement(Page, {
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
}(_react.Component);

exports.default = LayoutManager;
LayoutManager.defaultProps = {
  collapseToggleTooltipContent: defaultTooltipContent,
  experimental_flyoutOnHover: false
};