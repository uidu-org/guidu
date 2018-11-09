import React from 'react';
import PackageIcon from '@atlaskit/icon/glyph/chevron-right';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import styled from 'styled-components';
import { isSubNavExpanded } from '../utils/linkComponents';
import renderNav from '../utils/renderNav';
import * as fs from '../../../utils/fs';
import { packageUrl, packageDocUrl } from '../../../utils/url';
var CenteredIcon = styled.span.withConfig({
  displayName: "Packages__CenteredIcon",
  componentId: "sc-1app9l9-0"
})(["\n  align-items: center;\n  display: flex;\n  font-size: 12px;\n  height: 16px;\n  justify-content: center;\n  line-height: 24px;\n  width: 16px;\n"]);
export function buildSubNavGroup(children, groupTitle, url, Icon) {
  if (!children || !children.length) return null;
  return children.filter(function (item) {
    return !item.id.startsWith('_');
  }).reduce(function (acc, item) {
    acc.items.push({
      to: url(fs.normalize(item.id)),
      title: fs.titleize(item.id),
      isCompact: true,
      icon: React.createElement(CenteredIcon, null, "\u2022")
    });
    return acc;
  }, {
    items: []
  });
}

var getItemDetails = function getItemDetails(pkg, group, pathname) {
  var navigationItemIcon = React.createElement(CenteredIcon, null, "\u2022");
  var docs = fs.maybeGetById(fs.getDirectories(pkg.children) || [], 'docs');
  var examples = fs.maybeGetById(fs.getDirectories(pkg.children) || [], 'examples');
  if (!docs) return null;
  if (!examples) return null;
  var docItems = fs.getFiles(docs && docs.children && docs.children.length ? docs.children : []).slice(1);
  var items = [];
  var docsSubnav = buildSubNavGroup(docItems, 'Docs', packageDocUrl.bind(null, group.id, pkg.id), PackageIcon);
  if (docsSubnav) items.push(docsSubnav);

  if (items.length) {
    navigationItemIcon = isSubNavExpanded(packageUrl(group.id, pkg.id), pathname) ? React.createElement(ChevronDownIcon, {
      size: "small"
    }) : React.createElement(PackageIcon, {
      size: "small"
    });
  }

  return {
    isCompact: true,
    icon: navigationItemIcon,
    to: packageUrl(group.id, pkg.id),
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

export default function PackagesNav(props) {
  var packages = props.packages,
      pathname = props.pathname;
  console.log(pathname);
  return React.createElement("div", null, renderNav(packages, {
    pathname: pathname
  }));
}