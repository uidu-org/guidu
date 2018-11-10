import React from 'react';
import Table from '@atlaskit/dynamic-table';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { gridSize } from '@atlaskit/theme';
import * as fs from '../utils/fs';
import Page, { Title, Section } from '../components/Page';
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
      content: React.createElement(RowCell, null, React.createElement("a", {
        href: "/packages/".concat(groupId, "/").concat(id)
      }, fs.titleize(id)))
    }, {
      key: 'description',
      shouldTruncate: true,
      content: React.createElement(RowCell, null, description)
    }, {
      key: 'publishTime',
      // new website structure does not have an easy way to get date of last
      // release, so we are skipping it for now.
      content: React.createElement(RowCell, null, React.createElement("a", {
        href: "https://www.npmjs.com/package/".concat(packageName),
        target: "_new"
      }, version), null)
    }, {
      key: groupId,
      content: React.createElement(RowCell, null, fs.titleize(groupId))
    }, {
      content: React.createElement(RowCell, null, maintainers && maintainers.map(function (val) {
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

export default function PackagesList() {
  return React.createElement(Page, {
    width: "large"
  }, React.createElement(Helmet, null, React.createElement("title", null, "Browse all packages")), React.createElement(Title, null, "All Packages"), React.createElement(Section, null, React.createElement(Table, {
    head: head,
    rows: StatRows(),
    isFixedSize: true,
    defaultSortKey: "name",
    defaultSortOrder: "ASC"
  })));
} // Tabular data

var RowCell = styled.div.withConfig({
  displayName: "PackagesList__RowCell",
  componentId: "sc-1fl9n5m-0"
})(["\n  padding-bottom: ", "px;\n  padding-top: ", "px;\n"], gridSize, gridSize);