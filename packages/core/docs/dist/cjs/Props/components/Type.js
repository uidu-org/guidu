"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StringType = exports.TypeMeta = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _theme = require("@atlaskit/theme");

var Type = _styledComponents.default.span.withConfig({
  displayName: "Type",
  componentId: "oi9t8e-0"
})(["\n  background-color: ", ";\n  border-radius: ", "px;\n  color: ", ";\n  display: inline-block;\n  margin: 2px 0;\n  padding: 0 0.2em;\n"], (0, _theme.themed)({
  light: _theme.colors.P50,
  dark: _theme.colors.P500
}), _theme.borderRadius, (0, _theme.themed)({
  light: _theme.colors.P500,
  dark: _theme.colors.P50
}));

var TypeMeta = (0, _styledComponents.default)(Type).withConfig({
  displayName: "Type__TypeMeta",
  componentId: "oi9t8e-1"
})(["\n  background-color: ", ";\n  color: ", ";\n"], (0, _theme.themed)({
  light: _theme.colors.N20,
  dark: _theme.colors.DN50
}), _theme.colors.subtleText);
exports.TypeMeta = TypeMeta;
var StringType = (0, _styledComponents.default)(Type).withConfig({
  displayName: "Type__StringType",
  componentId: "oi9t8e-2"
})(["\n  background-color: ", ";\n  color: ", ";\n"], (0, _theme.themed)({
  light: _theme.colors.G50,
  dark: _theme.colors.G500
}), (0, _theme.themed)({
  light: _theme.colors.G500,
  dark: _theme.colors.G100
}));
exports.StringType = StringType;
var _default = Type;
exports.default = _default;