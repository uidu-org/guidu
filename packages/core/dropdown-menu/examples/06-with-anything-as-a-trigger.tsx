import Avatar from '@uidu/avatar';
import { MenuGroup } from '@uidu/menu';
import React from 'react';
import { HelpCircle } from 'react-feather';
import Dropdown from '../src';

const getDropDownData = () => (
  <MenuGroup title="Heading">
    {/* <DropdownItem>Hello it with some really quite long text here.</DropdownItem>
    <DropdownItem>Some text 2</DropdownItem>
    <DropdownItem isDisabled>Some disabled text</DropdownItem>
    <DropdownItem>Some more text</DropdownItem>
    <DropdownItem href="//atlassian.com" target="_new">
      A link item
    </DropdownItem> */}
  </MenuGroup>
);

// added tabIndex in dropdown trigger for keyboard naviagtion support

export default () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 200,
      padding: '20px 0',
    }}
  >
    <Dropdown trigger={<span tabIndex="0">click me</span>}>
      {getDropDownData()}
    </Dropdown>
    <Dropdown trigger={<span tabIndex="0">{<Avatar />}</span>}>
      {getDropDownData()}
    </Dropdown>
    <Dropdown
      trigger={
        <span tabIndex="0">
          <HelpCircle label="dropdown`s trigger" />
        </span>
      }
    >
      {getDropDownData()}
    </Dropdown>
  </div>
);
