"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _spinner = _interopRequireDefault(require("@atlaskit/spinner"));

var Container = _styledComponents.default.div.withConfig({
  displayName: "Loading__Container",
  componentId: "sc-1489rhy-0"
})(["\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  height: 80vh;\n  justify-content: center;\n"]);

var Loading = function Loading(props) {
  return _react.default.createElement(Container, null, _react.default.createElement(_spinner.default, props));
};

Loading.defaultProps = {
  size: 'large'
};
var _default = Loading;
exports.default = _default;
module.exports = exports.default;