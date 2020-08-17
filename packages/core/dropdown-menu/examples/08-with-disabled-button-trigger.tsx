import { defaultProps as defaultButtonProps } from '@uidu/button';
import React from 'react';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '../src';

export default () => (
  <DropdownMenu
    trigger="Disabled trigger"
    triggerType="button"
    triggerButtonProps={{ ...defaultButtonProps, isDisabled: true }}
  >
    <DropdownItemGroup>
      <DropdownItem>Sydney</DropdownItem>
      <DropdownItem>Melbourne</DropdownItem>
    </DropdownItemGroup>
  </DropdownMenu>
);
