import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import { toClass } from 'recompose';
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';
import { AkNavigationItem } from '@atlaskit/navigation';
import renderNav from './renderNav';
import { Link } from '../../../components/WrappedLink';
var SubNavWrapper = styled.div.withConfig({
  displayName: "linkComponents__SubNavWrapper",
  componentId: "sc-1x2dl2a-0"
})(["\n  padding: 0 0 0 ", "px;\n"], function () {
  return gridSize() * 4;
});
export function isSubNavExpanded(to, pathname) {
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
  return React.createElement("div", {
    key: pathname
  }, React.createElement(Link, {
    className: className,
    onClick: onClick,
    replace: replace,
    style: {
      color: 'inherit'
    },
    to: href
  }, children), subNav && isSubNavExpanded(href, pathname) && React.createElement(SubNavWrapper, null, renderNav(subNav, {
    pathname: pathname
  })));
};

export var RouterNavigationItem = function RouterNavigationItem(props) {
  return React.createElement(AkNavigationItem, _extends({
    linkComponent: toClass(function (linkProps) {
      return React.createElement(RouterLink, _extends({
        onClick: props.onClick,
        pathname: props.pathname,
        subNav: props.subNav
      }, linkProps));
    })
  }, props));
};
export var ExternalNavigationItem = function ExternalNavigationItem(props) {
  return React.createElement(AkNavigationItem, props);
};