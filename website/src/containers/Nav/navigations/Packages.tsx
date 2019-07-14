import {Package} from 'react-feather';
import * as React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { Directory, File, NavGroup, NavGroupItem } from '../../../types';
import * as fs from '../../../utils/fs';
import { packageDocUrl, packageUrl } from '../../../utils/url';

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
          text: fs.titleize(item.id),
          type: 'NavigationItem',
          as: Link,
        });
        return acc;
      },
      { items: [] as Array<NavGroupItem> },
    );
}

const getItemDetails = (pkg: Directory, group: Directory, pathname) => {
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
    Package,
  );

  if (docsSubnav) items.push(docsSubnav);

  return {
    to: packageUrl(group.id, pkg.id),
    text: fs.titleize(pkg.id),
    type: 'NavigationItem',
    as: Link,
    items,
  };
};

export type PackagesNavProps = {
  pathname: string;
  packages: Directory;
  onClick?: (e: Event) => void;
};

export const standardGroups = (dirs: Array<Directory>, pathname): NavGroup[] =>
  dirs.map(group => {
    const packages = fs.getDirectories(group.children);
    return {
      heading: group.id,
      type: 'NavigationGroup',
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
