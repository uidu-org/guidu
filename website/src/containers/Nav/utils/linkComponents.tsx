import * as React from 'react';
import { toClass } from 'recompose';
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';
import { AkNavigationItem } from '@atlaskit/navigation';
import renderNav from './renderNav';
import { Link } from '../../../components/WrappedLink';
import { NavGroup } from '../../../types';

export type RouterLinkProps = {
  children?: React.ReactChild;
  className?: string;
  href?: string | Record<string, string | Location>;
  onClick?: (e: Event) => void;
  pathname: string;
  replace?: boolean;
  subNav?: Array<NavGroup>;
  to?: string | Record<string, string | Location>;
  text: string;
  isSelected?: ((param1: string, param2: string) => boolean) | boolean;
  isCompact?: boolean;
  iconSelected?: boolean;
  icon?: React.ReactNode;
  items?: Array<NavGroup>;
};

const SubNavWrapper = styled.div`
  padding: 0 0 0 ${() => gridSize() * 4}px;
`;

export function isSubNavExpanded(
  to: string | Record<string, string | Location>,
  pathname: string,
): boolean {
  const lastSeg = (to as string).split('/').pop();
  return (
    pathname.startsWith(to as string) &&
    (!!pathname.match(new RegExp(`\/${lastSeg}\/`)) ||
      !!pathname.match(new RegExp(`\/${lastSeg}$`)))
  );
}

const RouterLink = ({
  children,
  href,
  replace,
  className,
  subNav,
  onClick,
  pathname,
}: RouterLinkProps) => {
  return (
    <div key={pathname}>
      <Link
        className={className}
        onClick={onClick}
        replace={replace}
        style={{ color: 'inherit' }}
        to={href}
      >
        {children}
      </Link>
      {subNav && href && isSubNavExpanded(href, pathname) && (
        <SubNavWrapper>
          {renderNav(subNav, { pathname, onClick })}
        </SubNavWrapper>
      )}
    </div>
  );
};

export const RouterNavigationItem = (props: RouterLinkProps) => {
  return (
    <AkNavigationItem
      linkComponent={toClass(linkProps => (
        <RouterLink
          onClick={props.onClick}
          pathname={props.pathname}
          subNav={props.subNav}
          {...linkProps}
        />
      ))}
      {...props}
    />
  );
};

// TODO: Type correct once navigation is typed
export const ExternalNavigationItem = (props: any) => (
  <AkNavigationItem {...props} />
);
