import React from 'react';
import CodeIcon from '@atlaskit/icon/glyph/code';
import renderNav from '../utils/renderNav';
import buildNavGroups from '../utils/buildNavGroups';
export default function PatternsNav(_ref) {
  var pathname = _ref.pathname,
      patterns = _ref.patterns;
  var groups = buildNavGroups('patterns', CodeIcon, pathname, patterns);
  groups.unshift({
    items: [{
      to: '/patterns',
      title: 'Overview' // icon: <IssuesIcon label="About patterns" />,

    }]
  });
  return React.createElement("div", null, renderNav(groups, {
    pathname: pathname
  }));
}