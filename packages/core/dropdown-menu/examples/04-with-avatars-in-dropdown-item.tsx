import Avatar from '@uidu/avatar';
import { MenuGroup } from '@uidu/menu';
import React from 'react';
import Dropdown, { ButtonItem } from '../src';

export default () => (
  <Dropdown defaultOpen trigger="Drop menu">
    <MenuGroup title="Friends">
      <ButtonItem elemBefore={<Avatar size="small" />}>Some text</ButtonItem>
      <ButtonItem elemBefore={<Avatar size="small" />}>
        Some text also
      </ButtonItem>
    </MenuGroup>
  </Dropdown>
);
