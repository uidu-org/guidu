import React from 'react';
import PageIcon from '@atlaskit/icon/glyph/page';
import renderNav from '../utils/renderNav';
import buildNavGroups from '../utils/buildNavGroups';
export default function DocsNav(_ref) {
  var pathname = _ref.pathname,
      docs = _ref.docs;
  var groups = buildNavGroups('docs', PageIcon, pathname, docs);
  return React.createElement("div", null, renderNav(groups, {
    pathname: pathname
  }));
}