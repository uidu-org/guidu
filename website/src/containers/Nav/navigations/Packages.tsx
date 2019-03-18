import * as React from 'react';
import PackageIcon from '@atlaskit/icon/glyph/chevron-right';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import styled from 'styled-components';
import { isSubNavExpanded } from '../utils/linkComponents';
import renderNav from '../utils/renderNav';
import { Directory, File, NavGroup, NavGroupItem } from '../../../types';
import * as fs from '../../../utils/fs';
import { packageUrl, packageDocUrl } from '../../../utils/url';

const CenteredIcon = styled.span`
  align-items: center;
  display: flex;
  font-size: 12px;
  height: 16px;
  justify-content: center;
  line-height: 24px;
  width: 16px;
`;

export function buildSubNavGroup(
  children: Array<File>,
  groupTitle: string,
  url: (id: string) => string,
  // TODO: [strictFunctionTypes] Fix any
  Icon: React.ComponentType<any>,
): NavGroup | null {
  if (!children || !children.length) return null;
  return children
    .filter(item => !item.id.startsWith('_'))
    .reduce(
      (acc, item) => {
        acc.items.push({
          to: url(fs.normalize(item.id)),
          title: fs.titleize(item.id),
          isCompact: true,
          icon: <CenteredIcon>•</CenteredIcon>,
        });
        return acc;
      },
      { items: [] as Array<NavGroupItem> },
    );
}

const getItemDetails = (pkg: Directory, group: Directory, pathname) => {
  let navigationItemIcon = <CenteredIcon>•</CenteredIcon>;
  const docs = fs.maybeGetById(fs.getDirectories(pkg.children) || [], 'docs');
  const examples = fs.maybeGetById(
    fs.getDirectories(pkg.children) || [],
    'examples',
  );
  if (!docs) return null;
  if (!examples) return null;

  const docItems = fs
    .getFiles(
      docs && docs.children && docs.children.length ? docs.children : [],
    )
    .slice(1);

  const items: Array<NavGroup> = [];

  const docsSubnav = buildSubNavGroup(
    docItems,
    'Docs',
    packageDocUrl.bind(null, group.id, pkg.id),
    PackageIcon,
  );

  if (docsSubnav) items.push(docsSubnav);

  if (items.length) {
    navigationItemIcon = isSubNavExpanded(
      packageUrl(group.id, pkg.id),
      pathname,
    ) ? (
      <ChevronDownIcon label="chevron" size="small" />
    ) : (
      <PackageIcon label="package" size="small" />
    );
  }

  return {
    isCompact: true,
    icon: navigationItemIcon,
    to: packageUrl(group.id, pkg.id),
    title: fs.titleize(pkg.id),
    items,
  };
};

const packagesList = {
  to: '/packages',
  title: 'Overview',
};

export type PackagesNavProps = {
  pathname: string;
  packages: Directory;
  onClick?: (e: Event) => void;
};

const standardGroups = (dirs: Array<Directory>, pathname): NavGroup[] =>
  dirs.map(group => {
    const packages = fs.getDirectories(group.children);
    return {
      title: group.id,
      items: packages.reduce(
        (items, pkg) => {
          const details = getItemDetails(pkg, group, pathname);
          if (details) {
            return items.concat(details);
          }
          return items;
        },
        [] as Array<NavGroupItem>,
      ),
    };
  });

export default function PackagesNav(props: PackagesNavProps) {
  const { packages, pathname } = props;
  const dirs = fs.getDirectories(packages.children);

  return (
    <div>
      {renderNav(
        [{ items: [packagesList] }, ...standardGroups(dirs, pathname)],
        {
          pathname,
        },
      )}
    </div>
  );
}
