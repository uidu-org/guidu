"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DefaultNav;

var _react = _interopRequireDefault(require("react"));

var _homeFilled = _interopRequireDefault(require("@atlaskit/icon/glyph/home-filled"));

var _component = _interopRequireDefault(require("@atlaskit/icon/glyph/component"));

var _overview = _interopRequireDefault(require("@atlaskit/icon/glyph/overview"));

var _logo = require("@atlaskit/logo");

var _dashboard = _interopRequireDefault(require("@atlaskit/icon/glyph/dashboard"));

var _renderNav = _interopRequireDefault(require("../utils/renderNav"));

var defaultNavGroups = [{
  items: [{
    to: '/',
    title: 'Welcome',
    icon: _react.default.createElement(_homeFilled.default, {
      label: "Welcome icon"
    })
  }]
}, {
  title: 'Get Started',
  items: [{
    to: '/docs',
    title: 'Documentation',
    icon: _react.default.createElement(_overview.default, {
      label: "Documentation"
    })
  }, {
    to: '/packages',
    title: 'Packages',
    icon: _react.default.createElement(_component.default, {
      label: "Packages icon"
    })
  }]
}, {
  title: 'Resources',
  items: [{
    to: 'https://bitbucket.org/atlassian/atlaskit-mk-2',
    title: 'Repository',
    icon: _react.default.createElement(_logo.BitbucketIcon, {
      label: "Repository"
    }),
    external: true
  }, {
    to: 'https://atlassian.design/',
    title: 'Design guidelines',
    icon: _react.default.createElement(_dashboard.default, {
      label: "Design guidelines icon"
    }),
    external: true
  }]
}];

function DefaultNav(_ref) {
  var onClick = _ref.onClick,
      pathname = _ref.pathname;
  return _react.default.createElement("div", null, (0, _renderNav.default)(defaultNavGroups, {
    onClick: onClick,
    pathname: pathname
  }));
}

module.exports = exports.default;