"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecondaryItemsList = exports.FirstPrimaryItemWrapper = exports.PrimaryItemsList = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _theme = require("@atlaskit/theme");

var gridSize = (0, _theme.gridSize)();
var listBaseStyles = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%'
};

var PrimaryItemsList = function PrimaryItemsList(props) {
  return _react.default.createElement("div", (0, _extends2.default)({
    css: (0, _objectSpread2.default)({}, listBaseStyles, {
      paddingBottom: gridSize * 2
    })
  }, props));
};

exports.PrimaryItemsList = PrimaryItemsList;

var FirstPrimaryItemWrapper = function FirstPrimaryItemWrapper(props) {
  return _react.default.createElement("div", (0, _extends2.default)({
    css: {
      paddingBottom: gridSize
    }
  }, props));
};

exports.FirstPrimaryItemWrapper = FirstPrimaryItemWrapper;

var SecondaryItemsList = function SecondaryItemsList(props) {
  return _react.default.createElement("div", (0, _extends2.default)({
    css: (0, _objectSpread2.default)({}, listBaseStyles, {
      paddingTop: gridSize
    })
  }, props));
};

exports.SecondaryItemsList = SecondaryItemsList;