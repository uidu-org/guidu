import * as React from 'react';
import { AkNavigationItemGroup } from '@atlaskit/navigation';
import { RouterNavigationItem, ExternalNavigationItem } from './linkComponents';
import { NavGroup } from '../../../types';

export type Props = {
  onClick?: (e: Event) => void;
  pathname: string;
};

export default function renderNav(
  groups: Array<NavGroup>,
  { onClick, pathname }: Props,
) {
  return groups.map((group, index) => (
    <AkNavigationItemGroup
      title={group.title}
      key={pathname + index + (group.title || '')}
    >
      {group.items.map(item => {
        const isAncestor =
          item.to &&
          typeof item.to === 'string' &&
          pathname.includes(item.to) &&
          pathname !== item.to;
        const isSelected = pathname === item.to;
        const icon =
          isSelected || isAncestor ? item.iconSelected || item.icon : item.icon;
        return item.external ? (
          <ExternalNavigationItem
            key={item.title}
            href={item.to}
            icon={icon}
            text={item.title}
          />
        ) : (
          <RouterNavigationItem
            isCompact={item.isCompact}
            key={item.title}
            href={item.to}
            icon={icon}
            onClick={onClick}
            text={item.title}
            isSelected={isSelected}
            pathname={pathname}
            subNav={item.items}
          />
        );
      })}
    </AkNavigationItemGroup>
  ));
}
