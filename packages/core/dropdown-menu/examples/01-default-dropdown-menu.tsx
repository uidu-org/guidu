import { ButtonItem, MenuGroup } from '@uidu/menu';
import React from 'react';
import DropdownMenu from '../src';

export default () => (
  <div style={{ margin: '20px' }}>
    <DropdownMenu
      trigger="Choices"
      shouldFlip={false}
      position="right middle"
      onOpenChange={(e) => console.log('dropdown opened', e)}
    >
      <MenuGroup>
        <ButtonItem>Sydney</ButtonItem>
        <ButtonItem>Melbourne</ButtonItem>
      </MenuGroup>
    </DropdownMenu>
  </div>
);
