"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PatternsNav;

var _react = _interopRequireDefault(require("react"));

var _code = _interopRequireDefault(require("@atlaskit/icon/glyph/code"));

var _renderNav = _interopRequireDefault(require("../utils/renderNav"));

var _buildNavGroups = _interopRequireDefault(require("../utils/buildNavGroups"));

function PatternsNav(_ref) {
  var pathname = _ref.pathname,
      patterns = _ref.patterns;
  var groups = (0, _buildNavGroups.default)('patterns', _code.default, pathname, patterns);
  groups.unshift({
    items: [{
      to: '/patterns',
      title: 'Overview' // icon: <IssuesIcon label="About patterns" />,

    }]
  });
  return _react.default.createElement("div", null, (0, _renderNav.default)(groups, {
    pathname: pathname
  }));
}

module.exports = exports.default;