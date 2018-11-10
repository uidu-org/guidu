import React from 'react';
import HomeFilledIcon from '@atlaskit/icon/glyph/home-filled';
import ComponentIcon from '@atlaskit/icon/glyph/component';
import OverviewIcon from '@atlaskit/icon/glyph/overview';
import { BitbucketIcon } from '@atlaskit/logo';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import renderNav from '../utils/renderNav';
var defaultNavGroups = [{
  items: [{
    to: '/',
    title: 'Welcome',
    icon: React.createElement(HomeFilledIcon, {
      label: "Welcome icon"
    })
  }]
}, {
  title: 'Get Started',
  items: [{
    to: '/docs',
    title: 'Documentation',
    icon: React.createElement(OverviewIcon, {
      label: "Documentation"
    })
  }, {
    to: '/packages',
    title: 'Packages',
    icon: React.createElement(ComponentIcon, {
      label: "Packages icon"
    })
  }]
}, {
  title: 'Resources',
  items: [{
    to: 'https://bitbucket.org/atlassian/atlaskit-mk-2',
    title: 'Repository',
    icon: React.createElement(BitbucketIcon, {
      label: "Repository"
    }),
    external: true
  }, {
    to: 'https://atlassian.design/',
    title: 'Design guidelines',
    icon: React.createElement(DashboardIcon, {
      label: "Design guidelines icon"
    }),
    external: true
  }]
}];
export default function DefaultNav(_ref) {
  var onClick = _ref.onClick,
      pathname = _ref.pathname;
  return React.createElement("div", null, renderNav(defaultNavGroups, {
    onClick: onClick,
    pathname: pathname
  }));
}