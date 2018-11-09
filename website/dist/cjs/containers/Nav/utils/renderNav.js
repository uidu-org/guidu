"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderNav;

var _react = _interopRequireDefault(require("react"));

var _navigation = require("@atlaskit/navigation");

var _linkComponents = require("./linkComponents");

function renderNav(groups, _ref) {
  var onClick = _ref.onClick,
      pathname = _ref.pathname;
  return groups.map(function (group, index) {
    return _react.default.createElement(_navigation.AkNavigationItemGroup, {
      title: group.title,
      key: pathname + index + (group.title || '')
    }, group.items.map(function (item) {
      var isAncestor = pathname.includes(item.to) && pathname !== item.to;
      var isSelected = pathname === item.to;
      var icon = isSelected || isAncestor ? item.iconSelected || item.icon : item.icon;
      return item.external ? _react.default.createElement(_linkComponents.ExternalNavigationItem, {
        key: item.title,
        href: item.to,
        icon: icon,
        text: item.title
      }) : _react.default.createElement(_linkComponents.RouterNavigationItem, {
        isCompact: item.isCompact,
        key: item.title,
        href: item.to,
        icon: icon,
        onClick: onClick,
        text: item.title,
        isSelected: isSelected,
        pathname: pathname,
        subNav: item.items
      });
    }));
  });
}

module.exports = exports.default;