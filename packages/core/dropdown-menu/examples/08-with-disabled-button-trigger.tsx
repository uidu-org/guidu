import { ButtonItem, MenuGroup } from '@uidu/menu';
import React from 'react';
import DropdownMenu from '../src';

export default () => (
  <DropdownMenu
    trigger="Disabled trigger"
    triggerButtonProps={{ isDisabled: true }}
  >
    <MenuGroup>
      <ButtonItem>Sydney</ButtonItem>
      <ButtonItem>Melbourne</ButtonItem>
    </MenuGroup>
  </DropdownMenu>
);
