"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _WrappedLink = require("../../components/WrappedLink");

var _recompose = require("recompose");

var _navigation = require("@atlaskit/navigation");

var _quickSearch = require("@atlaskit/quick-search");

var _arrowLeft = _interopRequireDefault(require("@atlaskit/icon/glyph/arrow-left"));

var _index = require("./index");

var LinkComponent = (0, _recompose.toClass)(function (_ref) {
  var href = _ref.href,
      children = _ref.children,
      onClick = _ref.onClick,
      className = _ref.className;
  return _react.default.createElement(_WrappedLink.Link, {
    className: className,
    onClick: onClick,
    to: href
  }, children);
});

var NavItem = function NavItem(_ref2) {
  var dirId = _ref2.dirId,
      id = _ref2.id,
      closeDrawer = _ref2.closeDrawer;
  return _react.default.createElement(_navigation.AkNavigationItem, {
    onClick: closeDrawer,
    href: "/packages/".concat(dirId, "/").concat(id),
    linkComponent: LinkComponent,
    text: id
  });
};

var SearchDrawer = function SearchDrawer(_ref3) {
  var isOpen = _ref3.isOpen,
      closeDrawer = _ref3.closeDrawer,
      searchDrawerValue = _ref3.searchDrawerValue,
      updateSearchValue = _ref3.updateSearchValue,
      packages = _ref3.packages;
  return _react.default.createElement(_navigation.AkSearchDrawer, {
    backIcon: _react.default.createElement(_arrowLeft.default, {
      label: "go back"
    }),
    isOpen: isOpen,
    key: "search",
    onBackButton: closeDrawer,
    primaryIcon: _react.default.createElement(_index.AtlaskitIcon, {
      monochrome: true
    })
  }, _react.default.createElement(_quickSearch.AkSearch, {
    value: searchDrawerValue,
    onInput: updateSearchValue,
    onKeyDown: function onKeyDown() {}
  }, fs.getDirectories(packages.children).reduce(function (acc, dir) {
    var initialItems = fs.getDirectories(dir.children);
    var sanitizedValue = searchDrawerValue.toLowerCase();

    if (sanitizedValue.length > 0 && new RegExp("^".concat(sanitizedValue)).test(dir.id)) {
      return acc.concat(_react.default.createElement(_navigation.AkNavigationItemGroup, {
        title: dir.id,
        key: dir.id
      }, initialItems.map(function (_ref4) {
        var id = _ref4.id;
        return _react.default.createElement(NavItem, {
          dirId: dir.id,
          id: id,
          key: id,
          closeDrawer: closeDrawer
        });
      })));
    }

    var Items = initialItems.reduce(function (innerAccumulator, _ref5) {
      var id = _ref5.id;
      // Remove the `-` from name because that is how they are displayed in search
      var pageName = id.replace(/-/g, ' ');

      if (pageName.includes(sanitizedValue)) {
        return innerAccumulator.concat(_react.default.createElement(NavItem, {
          dirId: dir.id,
          id: id,
          closeDrawer: closeDrawer,
          key: id
        }));
      }

      return innerAccumulator;
    }, []);

    if (Items.length > 0) {
      return acc.concat(_react.default.createElement(_navigation.AkNavigationItemGroup, {
        title: dir.id,
        key: dir.id
      }, Items));
    }

    return acc;
  }, [])));
};

var _default = SearchDrawer;
exports.default = _default;
module.exports = exports.default;