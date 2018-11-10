import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React, { Fragment } from 'react';
import { keyframes } from 'emotion';
import Transition from 'react-transition-group/Transition';
import { colors } from '@atlaskit/theme';
import { transitionDuration, transitionDurationMs, transitionTimingFunction } from '../../../../common/constants';
import { Shadow } from '../../../../common/primitives';
import { light, withContentTheme, ThemeProvider } from '../../../../theme';

var animationFade = function animationFade(state) {
  var defaultStyle = {
    opacity: 0,
    transitionDuration: transitionDuration,
    transitionProperty: 'opacity',
    transitionTimingFunction: transitionTimingFunction
  };
  var transitionStyles = {
    entering: {
      opacity: 0
    },
    entered: {
      opacity: 1
    }
  };
  return _objectSpread({}, defaultStyle, transitionStyles[state]);
};
/**
 * Component tree structure
 *  - ProductNavigation
 *  - ContainerNavigation
 *    - ContainerOverlay
 *  - InnerShadow
 */


var ScrollProvider = function ScrollProvider(props) {
  return React.createElement("div", _extends({
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
    mode: light,
    context: 'product'
  } : _ref$theme;
  return React.createElement("div", {
    css: theme.mode.contentNav().product
  }, React.createElement(ScrollProvider, null, children));
};

var ProductNavigationPrimitive = withContentTheme(ProductNavigationPrimitiveBase);
export var ProductNavigationTheme = function ProductNavigationTheme(_ref2) {
  var children = _ref2.children;
  return React.createElement(ThemeProvider, {
    theme: function theme(oldTheme) {
      return _objectSpread({
        mode: light
      }, oldTheme, {
        context: 'product'
      });
    }
  }, React.createElement(Fragment, null, children));
};
export var ProductNavigation = function ProductNavigation(props) {
  return React.createElement(ProductNavigationTheme, null, React.createElement(ProductNavigationPrimitive, props));
};
var slideIn = keyframes(["\n  from { transform: translateX(100%); }\n  to { transform: translateX(0); }\n"]);
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
  return React.createElement("div", {
    css: _objectSpread({}, theme.mode.contentNav().container, {
      animationName: animationName,
      animationDuration: transitionDuration,
      animationFillMode: 'forwards',
      animationTimingFunction: transitionTimingFunction,
      transitionProperty: 'boxShadow, transform',
      transitionDuration: transitionDuration,
      transitionTimingFunction: transitionTimingFunction,
      transform: transform
    })
  }, React.createElement(ScrollProvider, null, children));
};

var ContainerNavigationPrimitive = withContentTheme(ContainerNavigationPrimitiveBase);
export var ContainerNavigationTheme = function ContainerNavigationTheme(_ref4) {
  var children = _ref4.children;
  return React.createElement(ThemeProvider, {
    theme: {
      mode: light,
      context: 'container'
    }
  }, React.createElement(Fragment, null, children));
};
export var ContainerNavigation = function ContainerNavigation(props) {
  return React.createElement(ContainerNavigationTheme, null, React.createElement(ContainerNavigationPrimitive, props));
};
/**
 * ContainerOverlay
 */

export var ContainerOverlay = function ContainerOverlay(_ref5) {
  var isVisible = _ref5.isVisible,
      onClick = _ref5.onClick,
      props = _objectWithoutProperties(_ref5, ["isVisible", "onClick"]);

  return React.createElement("div", _extends({
    css: {
      backgroundColor: colors.N70A,
      cursor: isVisible ? 'pointer' : 'default',
      height: '100%',
      left: 0,
      opacity: isVisible ? 1 : 0,
      pointerEvents: isVisible ? 'all' : 'none',
      position: 'absolute',
      top: 0,
      transitionDuration: transitionDuration,
      transitionProperty: 'opacity',
      transitionTimingFunction: transitionTimingFunction,
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

export var InnerShadow = function InnerShadow(_ref6) {
  var isVisible = _ref6.isVisible;
  return React.createElement(Transition, {
    appear: true,
    in: isVisible,
    mountOnEnter: true,
    timeout: transitionDurationMs,
    unmountOnExit: true
  }, function (state) {
    var styles = _objectSpread({}, animationFade(state), {
      left: 'auto',
      right: 0
    });

    return React.createElement(Shadow, {
      isBold: true,
      style: styles
    });
  });
};