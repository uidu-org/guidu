// @flow
import React from 'react';
import RouterLinkComponent from './RouterLinkComponent';
import { AkNavigationItem } from '../../../src';

type Props = {
  to: string,
  text: string,
  isSelected: boolean,
};

const RouterLinkItem = ({ to, text, isSelected }: Props) => (
  <AkNavigationItem
    href={to}
    isSelected={isSelected}
    linkComponent={RouterLinkComponent}
    text={text}
  />
);

export default RouterLinkItem;
