"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _unstated = require("unstated");

var _ViewController = _interopRequireDefault(require("./ViewController"));

var ViewControllerSubscriber = function ViewControllerSubscriber(props) {
  return _react.default.createElement(_unstated.Subscribe, (0, _extends2.default)({
    to: [_ViewController.default]
  }, props));
};

var _default = ViewControllerSubscriber;
exports.default = _default;
module.exports = exports.default;