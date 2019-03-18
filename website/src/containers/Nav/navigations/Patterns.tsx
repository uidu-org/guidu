import * as React from 'react';
import CodeIcon from '@atlaskit/icon/glyph/code';
import { Directory } from '../../../types';
import renderNav from '../utils/renderNav';
import buildNavGroups from '../utils/buildNavGroups';

export type PatternsNavProps = {
  pathname: string;
  patterns: Directory;
  onClick?: (e: Event) => void | undefined;
};

export default function PatternsNav({
  pathname,
  patterns,
  onClick,
}: PatternsNavProps) {
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

  return <div>{renderNav(groups, { pathname, onClick })}</div>;
}
