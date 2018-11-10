"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _unstated = require("unstated");

var _UIController = _interopRequireDefault(require("./UIController"));

var UIControllerSubscriber = function UIControllerSubscriber(_ref) {
  var children = _ref.children;
  return _react.default.createElement(_unstated.Subscribe, {
    to: [_UIController.default]
  }, children);
};

var _default = UIControllerSubscriber;
exports.default = _default;
module.exports = exports.default;