"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "size", {
  enumerable: true,
  get: function get() {
    return _Icon.size;
  }
});
Object.defineProperty(exports, "Skeleton", {
  enumerable: true,
  get: function get() {
    return _Skeleton.default;
  }
});
Object.defineProperty(exports, "metadata", {
  enumerable: true,
  get: function get() {
    return _metadata.default;
  }
});
exports.default = void 0;

var _Icon = _interopRequireWildcard(require("./components/Icon"));

var _Skeleton = _interopRequireDefault(require("./components/Skeleton"));

var _metadata = _interopRequireDefault(require("./metadata"));

var _default = _Icon.default;
exports.default = _default;