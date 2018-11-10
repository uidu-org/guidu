"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildSubNavGroup = buildSubNavGroup;
exports.default = PackagesNav;

var _react = _interopRequireDefault(require("react"));

var _chevronRight = _interopRequireDefault(require("@atlaskit/icon/glyph/chevron-right"));

var _chevronDown = _interopRequireDefault(require("@atlaskit/icon/glyph/chevron-down"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _linkComponents = require("../utils/linkComponents");

var _renderNav = _interopRequireDefault(require("../utils/renderNav"));

var fs = _interopRequireWildcard(require("../../../utils/fs"));

var _url = require("../../../utils/url");

var CenteredIcon = _styledComponents.default.span.withConfig({
  displayName: "Packages__CenteredIcon",
  componentId: "sc-1app9l9-0"
})(["\n  align-items: center;\n  display: flex;\n  font-size: 12px;\n  height: 16px;\n  justify-content: center;\n  line-height: 24px;\n  width: 16px;\n"]);

function buildSubNavGroup(children, groupTitle, url, Icon) {
  if (!children || !children.length) return null;
  return children.filter(function (item) {
    return !item.id.startsWith('_');
  }).reduce(function (acc, item) {
    acc.items.push({
      to: url(fs.normalize(item.id)),
      title: fs.titleize(item.id),
      isCompact: true,
      icon: _react.default.createElement(CenteredIcon, null, "\u2022")
    });
    return acc;
  }, {
    items: []
  });
}

var getItemDetails = function getItemDetails(pkg, group, pathname) {
  var navigationItemIcon = _react.default.createElement(CenteredIcon, null, "\u2022");

  var docs = fs.maybeGetById(fs.getDirectories(pkg.children) || [], 'docs');
  var examples = fs.maybeGetById(fs.getDirectories(pkg.children) || [], 'examples');
  if (!docs) return null;
  if (!examples) return null;
  var docItems = fs.getFiles(docs && docs.children && docs.children.length ? docs.children : []).slice(1);
  var items = [];
  var docsSubnav = buildSubNavGroup(docItems, 'Docs', _url.packageDocUrl.bind(null, group.id, pkg.id), _chevronRight.default);
  if (docsSubnav) items.push(docsSubnav);

  if (items.length) {
    navigationItemIcon = (0, _linkComponents.isSubNavExpanded)((0, _url.packageUrl)(group.id, pkg.id), pathname) ? _react.default.createElement(_chevronDown.default, {
      size: "small"
    }) : _react.default.createElement(_chevronRight.default, {
      size: "small"
    });
  }

  return {
    isCompact: true,
    icon: navigationItemIcon,
    to: (0, _url.packageUrl)(group.id, pkg.id),
    title: fs.titleize(pkg.id),
    items: items
  };
};

var packagesList = {
  to: '/packages',
  title: 'Overview'
};

var standardGroups = function standardGroups(dirs, pathname) {
  return dirs.map(function (group) {
    var packages = fs.getDirectories(group.children);
    return {
      title: group.id,
      items: packages.reduce(function (items, pkg) {
        var details = getItemDetails(pkg, group, pathname);

        if (details) {
          return items.concat(details);
        }

        return items;
      }, [])
    };
  });
};

function PackagesNav(props) {
  var packages = props.packages,
      pathname = props.pathname;
  console.log(pathname);
  return _react.default.createElement("div", null, (0, _renderNav.default)(packages, {
    pathname: pathname
  }));
}