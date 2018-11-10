"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Toasts", {
  enumerable: true,
  get: function get() {
    return _components.default;
  }
});
Object.defineProperty(exports, "toastActions", {
  enumerable: true,
  get: function get() {
    return _ducks.actions;
  }
});
exports.toastReducer = void 0;

var _components = _interopRequireDefault(require("./components"));

var _ducks = _interopRequireWildcard(require("./ducks"));

var toastReducer = _ducks.default;
exports.toastReducer = toastReducer;