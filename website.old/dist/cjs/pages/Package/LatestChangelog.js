"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _WrappedLink = require("../../components/WrappedLink");

var _button = _interopRequireDefault(require("@atlaskit/button"));

var _lozenge = _interopRequireDefault(require("@atlaskit/lozenge"));

var _bulletList = _interopRequireDefault(require("@atlaskit/icon/glyph/bullet-list"));

var _theme = require("@atlaskit/theme");

var _ChangeLog = _interopRequireDefault(require("../../components/ChangeLog"));

var LatestChange = function LatestChange(_ref) {
  var changelog = _ref.changelog,
      pkgId = _ref.pkgId,
      groupId = _ref.groupId;
  if (!changelog || !changelog[0] || !changelog[0].version) return null;
  return _react.default.createElement(LogWrapper, null, _react.default.createElement(Latest, null), _react.default.createElement(_ChangeLog.default, {
    changelog: changelog,
    range: changelog[0].version,
    packageName: pkgId
  }), _react.default.createElement(Button, {
    component: _WrappedLink.Link,
    iconBefore: _react.default.createElement(_bulletList.default, {
      label: "List icon"
    }),
    to: "/packages/".concat(groupId, "/").concat(pkgId, "/changelog")
  }, "Changelog"));
};

var LogWrapper = _styledComponents.default.div.withConfig({
  displayName: "LatestChangelog__LogWrapper",
  componentId: "ouayyp-0"
})(["\n  border-top: 2px solid ", ";\n  margin-bottom: 2em;\n  padding-top: ", "px;\n  position: relative;\n\n  h2 {\n    font-size: 18px;\n    font-weight: 500;\n  }\n  ul {\n    padding-left: ", "px;\n\n    &:last-child {\n      margin-bottom: 0;\n    }\n  }\n"], (0, _theme.themed)({
  light: _theme.colors.N30,
  dark: _theme.colors.DN60
}), _theme.math.multiply(_theme.gridSize, 3), _theme.math.multiply(_theme.gridSize, 4));

var Button = (0, _styledComponents.default)(_button.default).withConfig({
  displayName: "LatestChangelog__Button",
  componentId: "ouayyp-1"
})(["\n  position: absolute;\n  right: 0;\n  top: ", "px;\n"], _theme.math.multiply(_theme.gridSize, 3));

var Latest = function Latest(_ref2) {
  var children = _ref2.children,
      rest = (0, _objectWithoutProperties2.default)(_ref2, ["children"]);
  return _react.default.createElement("span", {
    style: {
      position: 'relative',
      top: -3
    }
  }, _react.default.createElement(_lozenge.default, (0, _extends2.default)({
    appearance: "new"
  }, rest), children || 'Latest'));
};

var _default = LatestChange;
exports.default = _default;
module.exports = exports.default;