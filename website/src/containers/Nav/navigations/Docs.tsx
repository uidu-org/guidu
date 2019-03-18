import * as React from 'react';
import PageIcon from '@atlaskit/icon/glyph/page';
import { Directory } from '../../../types';
import renderNav from '../utils/renderNav';
import buildNavGroups from '../utils/buildNavGroups';

export type DocsNavProps = {
  onClick?: (e: Event) => void;
  pathname: string;
  docs: Directory;
};

export default function DocsNav({ pathname, docs, onClick }: DocsNavProps) {
  const groups = buildNavGroups('docs', PageIcon, pathname, docs);
  return <div>{renderNav(groups, { pathname, onClick })}</div>;
}
