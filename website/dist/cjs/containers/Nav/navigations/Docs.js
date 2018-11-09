"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DocsNav;

var _react = _interopRequireDefault(require("react"));

var _page = _interopRequireDefault(require("@atlaskit/icon/glyph/page"));

var _renderNav = _interopRequireDefault(require("../utils/renderNav"));

var _buildNavGroups = _interopRequireDefault(require("../utils/buildNavGroups"));

function DocsNav(_ref) {
  var pathname = _ref.pathname,
      docs = _ref.docs;
  var groups = (0, _buildNavGroups.default)('docs', _page.default, pathname, docs);
  return _react.default.createElement("div", null, (0, _renderNav.default)(groups, {
    pathname: pathname
  }));
}

module.exports = exports.default;