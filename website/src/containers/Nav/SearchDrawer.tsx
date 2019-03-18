import * as React from 'react';
import { Link } from '../../components/WrappedLink';
import { toClass } from 'recompose';
import {
  AkSearchDrawer,
  AkNavigationItem,
  AkNavigationItemGroup,
} from '@atlaskit/navigation';
import { AkSearch } from '@atlaskit/quick-search';

import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';

import * as fs from '../../utils/fs';
import { Directory } from '../../types';
import { AtlaskitIcon } from './index';

const LinkComponent = toClass(({ href, children, onClick, className }) => (
  <Link className={className} onClick={onClick} to={href}>
    {children}
  </Link>
));

const NavItem = ({ dirId, id, closeDrawer }) => (
  <AkNavigationItem
    onClick={closeDrawer}
    href={`/packages/${dirId}/${id}`}
    linkComponent={LinkComponent}
    text={fs.titleize(id)}
  />
);

const SearchDrawer = ({
  isOpen,
  closeDrawer,
  searchDrawerValue,
  updateSearchValue,
  packages,
}: {
  isOpen: boolean;
  closeDrawer: (e: Event) => void;
  searchDrawerValue: string;

  // TODO: [strictFunctionTypes] Fix any
  updateSearchValue: (e: React.ChangeEvent<any>) => void;
  packages: Directory;
}) => (
  <AkSearchDrawer
    backIcon={<ArrowLeftIcon label="go back" />}
    isOpen={isOpen}
    key="search"
    onBackButton={closeDrawer}
    primaryIcon={<AtlaskitIcon monochrome />}
  >
    <AkSearch
      value={searchDrawerValue}
      onInput={updateSearchValue}
      onKeyDown={() => {}}
    >
      {fs
        .getDirectories(packages.children)
        .reduce<Array<React.ReactChild>>((acc, dir) => {
          const initialItems = fs.getDirectories(dir.children);
          const sanitizedValue = searchDrawerValue.toLowerCase();
          if (
            sanitizedValue.length > 0 &&
            new RegExp(`^${sanitizedValue}`).test(dir.id)
          ) {
            return acc.concat(
              <AkNavigationItemGroup title={dir.id} key={dir.id}>
                {initialItems.map(({ id }) => (
                  <NavItem
                    dirId={dir.id}
                    id={id}
                    key={id}
                    closeDrawer={closeDrawer}
                  />
                ))}
              </AkNavigationItemGroup>,
            );
          }
          const Items = initialItems.reduce<Array<React.ReactChild>>(
            (innerAccumulator, { id }) => {
              // Remove the `-` from name because that is how they are displayed in search
              const pageName = id.replace(/-/g, ' ');
              if (pageName.includes(sanitizedValue)) {
                return innerAccumulator.concat(
                  <NavItem
                    dirId={dir.id}
                    id={id}
                    closeDrawer={closeDrawer}
                    key={id}
                  />,
                );
              }
              return innerAccumulator;
            },
            [],
          );
          if (Items.length > 0) {
            return acc.concat(
              <AkNavigationItemGroup title={dir.id} key={dir.id}>
                {Items}
              </AkNavigationItemGroup>,
            );
          }
          return acc;
        }, [])}
    </AkSearch>
  </AkSearchDrawer>
);

export default SearchDrawer;
