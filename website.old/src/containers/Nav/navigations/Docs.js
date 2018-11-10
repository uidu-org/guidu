// @flow

import React from 'react';
import PageIcon from '@atlaskit/icon/glyph/page';
import type { Directory } from '../../../types';
import renderNav from '../utils/renderNav';
import buildNavGroups from '../utils/buildNavGroups';

export type DocsNavProps = {
  pathname: string,
  docs: Directory,
};

export default function DocsNav({ pathname, docs }: DocsNavProps) {
  const groups = buildNavGroups('docs', PageIcon, pathname, docs);
  return <div>{renderNav(groups, { pathname })}</div>;
}
