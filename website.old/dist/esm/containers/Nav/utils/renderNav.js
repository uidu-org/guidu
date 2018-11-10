import React from 'react';
import { AkNavigationItemGroup } from '@atlaskit/navigation';
import { RouterNavigationItem, ExternalNavigationItem } from './linkComponents';
export default function renderNav(groups, _ref) {
  var onClick = _ref.onClick,
      pathname = _ref.pathname;
  return groups.map(function (group, index) {
    return React.createElement(AkNavigationItemGroup, {
      title: group.title,
      key: pathname + index + (group.title || '')
    }, group.items.map(function (item) {
      var isAncestor = pathname.includes(item.to) && pathname !== item.to;
      var isSelected = pathname === item.to;
      var icon = isSelected || isAncestor ? item.iconSelected || item.icon : item.icon;
      return item.external ? React.createElement(ExternalNavigationItem, {
        key: item.title,
        href: item.to,
        icon: icon,
        text: item.title
      }) : React.createElement(RouterNavigationItem, {
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