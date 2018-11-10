"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InnerShadow = exports.ContainerOverlay = exports.ContainerNavigation = exports.ContainerNavigationTheme = exports.ProductNavigation = exports.ProductNavigationTheme = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _emotion = require("emotion");

var _Transition = _interopRequireDefault(require("react-transition-group/Transition"));

var _theme = require("@atlaskit/theme");

var _constants = require("../../../../common/constants");

var _primitives = require("../../../../common/primitives");

var _theme2 = require("../../../../theme");

var animationFade = function animationFade(state) {
  var defaultStyle = {
    opacity: 0,
    transitionDuration: _constants.transitionDuration,
    transitionProperty: 'opacity',
    transitionTimingFunction: _constants.transitionTimingFunction
  };
  var transitionStyles = {
    entering: {
      opacity: 0
    },
    entered: {
      opacity: 1
    }
  };
  return (0, _objectSpread2.default)({}, defaultStyle, transitionStyles[state]);
};
/**
 * Component tree structure
 *  - ProductNavigation
 *  - ContainerNavigation
 *    - ContainerOverlay
 *  - InnerShadow
 */


var ScrollProvider = function ScrollProvider(props) {
  return _react.default.createElement("div", (0, _extends2.default)({
    css: {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflowX: 'hidden',
      overflowY: 'auto',
      width: '100%'
    }
  }, props));
};
/**
 * ProductNavigation
 */


var ProductNavigationPrimitiveBase = function ProductNavigationPrimitiveBase(_ref) {
  var children = _ref.children,
      _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? {
    mode: _theme2.light,
    context: 'product'
  } : _ref$theme;
  return _react.default.createElement("div", {
    css: theme.mode.contentNav().product
  }, _react.default.createElement(ScrollProvider, null, children));
};

var ProductNavigationPrimitive = (0, _theme2.withContentTheme)(ProductNavigationPrimitiveBase);

var ProductNavigationTheme = function ProductNavigationTheme(_ref2) {
  var children = _ref2.children;
  return _react.default.createElement(_theme2.ThemeProvider, {
    theme: function theme(oldTheme) {
      return (0, _objectSpread2.default)({
        mode: _theme2.light
      }, oldTheme, {
        context: 'product'
      });
    }
  }, _react.default.createElement(_react.Fragment, null, children));
};

exports.ProductNavigationTheme = ProductNavigationTheme;

var ProductNavigation = function ProductNavigation(props) {
  return _react.default.createElement(ProductNavigationTheme, null, _react.default.createElement(ProductNavigationPrimitive, props));
};

exports.ProductNavigation = ProductNavigation;
var slideIn = (0, _emotion.keyframes)(["\n  from { transform: translateX(100%); }\n  to { transform: translateX(0); }\n"]);
/**
 * ContainerNavigation
 */

var ContainerNavigationPrimitiveBase = function ContainerNavigationPrimitiveBase(_ref3) {
  var children = _ref3.children,
      isEntering = _ref3.isEntering,
      isExiting = _ref3.isExiting,
      isPeekHinting = _ref3.isPeekHinting,
      isPeeking = _ref3.isPeeking,
      theme = _ref3.theme;
  var animationName;
  if (isEntering) animationName = slideIn;
  var transform = null;
  if (isPeekHinting) transform = 'translateX(16px)';
  if (isPeeking) transform = 'translateX(calc(100% - 32px))';
  if (isExiting) transform = 'translateX(100%)';
  return _react.default.createElement("div", {
    css: (0, _objectSpread2.default)({}, theme.mode.contentNav().container, {
      animationName: animationName,
      animationDuration: _constants.transitionDuration,
      animationFillMode: 'forwards',
      animationTimingFunction: _constants.transitionTimingFunction,
      transitionProperty: 'boxShadow, transform',
      transitionDuration: _constants.transitionDuration,
      transitionTimingFunction: _constants.transitionTimingFunction,
      transform: transform
    })
  }, _react.default.createElement(ScrollProvider, null, children));
};

var ContainerNavigationPrimitive = (0, _theme2.withContentTheme)(ContainerNavigationPrimitiveBase);

var ContainerNavigationTheme = function ContainerNavigationTheme(_ref4) {
  var children = _ref4.children;
  return _react.default.createElement(_theme2.ThemeProvider, {
    theme: {
      mode: _theme2.light,
      context: 'container'
    }
  }, _react.default.createElement(_react.Fragment, null, children));
};

exports.ContainerNavigationTheme = ContainerNavigationTheme;

var ContainerNavigation = function ContainerNavigation(props) {
  return _react.default.createElement(ContainerNavigationTheme, null, _react.default.createElement(ContainerNavigationPrimitive, props));
};
/**
 * ContainerOverlay
 */


exports.ContainerNavigation = ContainerNavigation;

var ContainerOverlay = function ContainerOverlay(_ref5) {
  var isVisible = _ref5.isVisible,
      onClick = _ref5.onClick,
      props = (0, _objectWithoutProperties2.default)(_ref5, ["isVisible", "onClick"]);
  return _react.default.createElement("div", (0, _extends2.default)({
    css: {
      backgroundColor: _theme.colors.N70A,
      cursor: isVisible ? 'pointer' : 'default',
      height: '100%',
      left: 0,
      opacity: isVisible ? 1 : 0,
      pointerEvents: isVisible ? 'all' : 'none',
      position: 'absolute',
      top: 0,
      transitionDuration: _constants.transitionDuration,
      transitionProperty: 'opacity',
      transitionTimingFunction: _constants.transitionTimingFunction,
      width: '100%',
      zIndex: 5
    },
    onClick: onClick,
    role: "presentation"
  }, props));
};
/**
 * InnerShadow
 */


exports.ContainerOverlay = ContainerOverlay;

var InnerShadow = function InnerShadow(_ref6) {
  var isVisible = _ref6.isVisible;
  return _react.default.createElement(_Transition.default, {
    appear: true,
    in: isVisible,
    mountOnEnter: true,
    timeout: _constants.transitionDurationMs,
    unmountOnExit: true
  }, function (state) {
    var styles = (0, _objectSpread2.default)({}, animationFade(state), {
      left: 'auto',
      right: 0
    });
    return _react.default.createElement(_primitives.Shadow, {
      isBold: true,
      style: styles
    });
  });
};

exports.InnerShadow = InnerShadow;