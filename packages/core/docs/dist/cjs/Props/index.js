"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _prettyProptypes = _interopRequireDefault(require("pretty-proptypes"));

var _button = _interopRequireDefault(require("@atlaskit/button"));

var _components = _interopRequireDefault(require("./components"));

var _chevronDown = _interopRequireDefault(require("@atlaskit/icon/glyph/chevron-down"));

var _chevronUp = _interopRequireDefault(require("@atlaskit/icon/glyph/chevron-up"));

_components.default.Button = function (_ref) {
  var isCollapsed = _ref.isCollapsed,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["isCollapsed"]);
  return _react.default.createElement(_button.default, (0, _extends2.default)({
    iconBefore: isCollapsed ? _react.default.createElement(_chevronDown.default, {
      label: "expandIcon"
    }) : _react.default.createElement(_chevronUp.default, {
      label: "collapseIcon"
    })
  }, rest));
};

var Props = function Props(props) {
  return _react.default.createElement(_prettyProptypes.default, (0, _extends2.default)({
    components: _components.default
  }, props));
};

var _default = Props;
exports.default = _default;
module.exports = exports.default;