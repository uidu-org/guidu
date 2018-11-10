"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyDisabledProperties = applyDisabledProperties;
exports.PageWrapper = exports.ContainerNavigationMask = exports.ContentNavigationWrapper = exports.NavigationContainer = exports.LayoutContainer = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _theme = require("@atlaskit/theme");

var LayoutContainer = function LayoutContainer(props) {
  return _react.default.createElement("div", (0, _extends2.default)({
    css: {
      display: 'flex',
      flexDirection: 'row',
      height: '100vh'
    }
  }, props));
};

exports.LayoutContainer = LayoutContainer;

var NavigationContainer = function NavigationContainer(_ref) {
  var innerRef = _ref.innerRef,
      props = (0, _objectWithoutProperties2.default)(_ref, ["innerRef"]);
  return _react.default.createElement("div", (0, _extends2.default)({
    ref: innerRef,
    css: {
      bottom: 0,
      display: 'flex',
      flexDirection: 'row',
      left: 0,
      position: 'fixed',
      top: 0,
      zIndex: _theme.layers.navigation()
    }
  }, props));
}; // Resizable Elements can be disabled


exports.NavigationContainer = NavigationContainer;

function applyDisabledProperties(disableInteraction) {
  return disableInteraction ? {
    pointerEvents: 'none',
    userSelect: 'none'
  } : null;
} // Content navigation


var ContentNavigationWrapper = function ContentNavigationWrapper(_ref2) {
  var innerRef = _ref2.innerRef,
      disableInteraction = _ref2.disableInteraction,
      props = (0, _objectWithoutProperties2.default)(_ref2, ["innerRef", "disableInteraction"]);
  return _react.default.createElement("div", (0, _extends2.default)({
    ref: innerRef,
    css: (0, _objectSpread2.default)({
      height: '100%',
      position: 'relative'
    }, applyDisabledProperties(disableInteraction))
  }, props));
};

exports.ContentNavigationWrapper = ContentNavigationWrapper;

var ContainerNavigationMask = function ContainerNavigationMask(_ref3) {
  var disableInteraction = _ref3.disableInteraction,
      props = (0, _objectWithoutProperties2.default)(_ref3, ["disableInteraction"]);
  return _react.default.createElement("div", (0, _extends2.default)({
    css: (0, _objectSpread2.default)({
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      height: '100%'
    }, applyDisabledProperties(disableInteraction))
  }, props));
}; // Page


exports.ContainerNavigationMask = ContainerNavigationMask;

var PageWrapper = function PageWrapper(_ref4) {
  var innerRef = _ref4.innerRef,
      disableInteraction = _ref4.disableInteraction,
      offset = _ref4.offset,
      props = (0, _objectWithoutProperties2.default)(_ref4, ["innerRef", "disableInteraction", "offset"]);
  return _react.default.createElement("div", (0, _extends2.default)({
    ref: innerRef,
    css: (0, _objectSpread2.default)({
      flex: '1 1 auto',
      marginLeft: offset,
      width: 0
    }, applyDisabledProperties(disableInteraction))
  }, props));
};

exports.PageWrapper = PageWrapper;