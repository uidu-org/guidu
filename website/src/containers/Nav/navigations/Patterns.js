// @flow

import React from 'react';
import CodeIcon from '@atlaskit/icon/glyph/code';
import type { Directory } from '../../../types';
import renderNav from '../utils/renderNav';
import buildNavGroups from '../utils/buildNavGroups';

export type PatternsNavProps = {
  pathname: string,
  patterns: Directory,
};

export default function PatternsNav({ pathname, patterns }: PatternsNavProps) {
  const groups = buildNavGroups('patterns', CodeIcon, pathname, patterns);
  groups.unshift({
    items: [
      {
        to: '/patterns',
        title: 'Overview',
        // icon: <IssuesIcon label="About patterns" />,
      },
    ],
  });

  return <div>{renderNav(groups, { pathname })}</div>;
}
