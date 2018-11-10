"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSubNavExpanded = isSubNavExpanded;
exports.ExternalNavigationItem = exports.RouterNavigationItem = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _theme = require("@atlaskit/theme");

var _navigation = require("@atlaskit/navigation");

var _renderNav = _interopRequireDefault(require("./renderNav"));

var _WrappedLink = require("../../../components/WrappedLink");

var SubNavWrapper = _styledComponents.default.div.withConfig({
  displayName: "linkComponents__SubNavWrapper",
  componentId: "sc-1x2dl2a-0"
})(["\n  padding: 0 0 0 ", "px;\n"], function () {
  return (0, _theme.gridSize)() * 4;
});

function isSubNavExpanded(to, pathname) {
  var lastSeg = to.split('/').pop();
  return pathname.startsWith(to) && (!!pathname.match(new RegExp("/".concat(lastSeg, "/"))) || !!pathname.match(new RegExp("/".concat(lastSeg, "$"))));
}

var RouterLink = function RouterLink(_ref) {
  var children = _ref.children,
      href = _ref.href,
      replace = _ref.replace,
      className = _ref.className,
      subNav = _ref.subNav,
      onClick = _ref.onClick,
      isSelected = _ref.isSelected,
      pathname = _ref.pathname;
  return _react.default.createElement("div", {
    key: pathname
  }, _react.default.createElement(_WrappedLink.Link, {
    className: className,
    onClick: onClick,
    replace: replace,
    style: {
      color: 'inherit'
    },
    to: href
  }, children), subNav && isSubNavExpanded(href, pathname) && _react.default.createElement(SubNavWrapper, null, (0, _renderNav.default)(subNav, {
    pathname: pathname
  })));
};

var RouterNavigationItem = function RouterNavigationItem(props) {
  return _react.default.createElement(_navigation.AkNavigationItem, (0, _extends2.default)({
    linkComponent: (0, _recompose.toClass)(function (linkProps) {
      return _react.default.createElement(RouterLink, (0, _extends2.default)({
        onClick: props.onClick,
        pathname: props.pathname,
        subNav: props.subNav
      }, linkProps));
    })
  }, props));
};

exports.RouterNavigationItem = RouterNavigationItem;

var ExternalNavigationItem = function ExternalNavigationItem(props) {
  return _react.default.createElement(_navigation.AkNavigationItem, props);
};

exports.ExternalNavigationItem = ExternalNavigationItem;