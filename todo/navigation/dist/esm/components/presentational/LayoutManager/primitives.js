import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import { layers } from '@atlaskit/theme';
export var LayoutContainer = function LayoutContainer(props) {
  return React.createElement("div", _extends({
    css: {
      display: 'flex',
      flexDirection: 'row',
      height: '100vh'
    }
  }, props));
};
export var NavigationContainer = function NavigationContainer(_ref) {
  var innerRef = _ref.innerRef,
      props = _objectWithoutProperties(_ref, ["innerRef"]);

  return React.createElement("div", _extends({
    ref: innerRef,
    css: {
      bottom: 0,
      display: 'flex',
      flexDirection: 'row',
      left: 0,
      position: 'fixed',
      top: 0,
      zIndex: layers.navigation()
    }
  }, props));
}; // Resizable Elements can be disabled

export function applyDisabledProperties(disableInteraction) {
  return disableInteraction ? {
    pointerEvents: 'none',
    userSelect: 'none'
  } : null;
} // Content navigation

export var ContentNavigationWrapper = function ContentNavigationWrapper(_ref2) {
  var innerRef = _ref2.innerRef,
      disableInteraction = _ref2.disableInteraction,
      props = _objectWithoutProperties(_ref2, ["innerRef", "disableInteraction"]);

  return React.createElement("div", _extends({
    ref: innerRef,
    css: _objectSpread({
      height: '100%',
      position: 'relative'
    }, applyDisabledProperties(disableInteraction))
  }, props));
};
export var ContainerNavigationMask = function ContainerNavigationMask(_ref3) {
  var disableInteraction = _ref3.disableInteraction,
      props = _objectWithoutProperties(_ref3, ["disableInteraction"]);

  return React.createElement("div", _extends({
    css: _objectSpread({
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      height: '100%'
    }, applyDisabledProperties(disableInteraction))
  }, props));
}; // Page

export var PageWrapper = function PageWrapper(_ref4) {
  var innerRef = _ref4.innerRef,
      disableInteraction = _ref4.disableInteraction,
      offset = _ref4.offset,
      props = _objectWithoutProperties(_ref4, ["innerRef", "disableInteraction", "offset"]);

  return React.createElement("div", _extends({
    ref: innerRef,
    css: _objectSpread({
      flex: '1 1 auto',
      marginLeft: offset,
      width: 0
    }, applyDisabledProperties(disableInteraction))
  }, props));
};