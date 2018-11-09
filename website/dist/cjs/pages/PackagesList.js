"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PackagesList;

var _react = _interopRequireDefault(require("react"));

var _dynamicTable = _interopRequireDefault(require("@atlaskit/dynamic-table"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactHelmet = require("react-helmet");

var _theme = require("@atlaskit/theme");

var fs = _interopRequireWildcard(require("../utils/fs"));

var _Page = _interopRequireWildcard(require("../components/Page"));

var packages = [];
var getConfig = {};
var head = {
  cells: [{
    key: 'name',
    content: 'Name',
    isSortable: true,
    width: 15
  }, {
    key: 'description',
    content: 'Description',
    shouldTruncate: true,
    isSortable: false,
    width: 45
  }, {
    key: 'publishTime',
    content: 'Latest',
    shouldTruncate: true,
    isSortable: false,
    width: 20
  }, {
    key: 'team',
    content: 'Team',
    shouldTruncate: true,
    isSortable: true,
    width: 20
  }, {
    key: 'maintainers',
    content: 'Maintainers',
    shouldTruncate: true,
    isSortable: false,
    width: 20
  }]
};

var renderRow = function renderRow(_ref, _ref2, groupId) {
  var packageName = _ref.name,
      description = _ref.description,
      maintainers = _ref.maintainers,
      version = _ref.version;
  var id = _ref2.id;
  return {
    cells: [{
      key: id,
      content: _react.default.createElement(RowCell, null, _react.default.createElement("a", {
        href: "/packages/".concat(groupId, "/").concat(id)
      }, fs.titleize(id)))
    }, {
      key: 'description',
      shouldTruncate: true,
      content: _react.default.createElement(RowCell, null, description)
    }, {
      key: 'publishTime',
      // new website structure does not have an easy way to get date of last
      // release, so we are skipping it for now.
      content: _react.default.createElement(RowCell, null, _react.default.createElement("a", {
        href: "https://www.npmjs.com/package/".concat(packageName),
        target: "_new"
      }, version), null)
    }, {
      key: groupId,
      content: _react.default.createElement(RowCell, null, fs.titleize(groupId))
    }, {
      content: _react.default.createElement(RowCell, null, maintainers && maintainers.map(function (val) {
        return val.name || val;
      }).join(', '))
    }]
  };
};

var StatRows = function StatRows() {
  return fs.getDirectories(packages.children).reduce(function (acc, team) {
    return acc.concat(fs.getDirectories(team.children).map(function (pkg) {
      var pkgJSON = getConfig(team.id, pkg.id).config;
      return renderRow(pkgJSON, pkg, team.id);
    }));
  }, []);
};

function PackagesList() {
  return _react.default.createElement(_Page.default, {
    width: "large"
  }, _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, "Browse all packages")), _react.default.createElement(_Page.Title, null, "All Packages"), _react.default.createElement(_Page.Section, null, _react.default.createElement(_dynamicTable.default, {
    head: head,
    rows: StatRows(),
    isFixedSize: true,
    defaultSortKey: "name",
    defaultSortOrder: "ASC"
  })));
} // Tabular data


var RowCell = _styledComponents.default.div.withConfig({
  displayName: "PackagesList__RowCell",
  componentId: "sc-1fl9n5m-0"
})(["\n  padding-bottom: ", "px;\n  padding-top: ", "px;\n"], _theme.gridSize, _theme.gridSize);

module.exports = exports.default;