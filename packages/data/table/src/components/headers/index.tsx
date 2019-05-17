import Dropdown, { DropdownItem, DropdownItemGroup } from '@uidu/dropdown-menu';
import React, { Component } from 'react';
import { ChevronDown, Lock } from 'react-feather';

export default class CustomHeader extends Component<any> {
  render() {
    const { enableMenu, displayName, menuIcon } = this.props;

    return (
      <div className="d-flex align-items-center justify-content-center">
        <div className="customHeaderLabel flex-grow-1 text-truncate">
          {menuIcon && <span className="mr-2">{menuIcon}</span>}
          {displayName}
        </div>
        {!!enableMenu ? (
          <Dropdown
            isMenuFixed
            trigger={
              <button className="btn p-1">
                <ChevronDown size={16} />
              </button>
            }
            position="bottom right"
          >
            <DropdownItemGroup title="Heading">
              <DropdownItem>
                Hello it with some really quite long text here.
              </DropdownItem>
              <DropdownItem>Some text 2</DropdownItem>
              <DropdownItem isDisabled>Some disabled text</DropdownItem>
              <DropdownItem>Some more text</DropdownItem>
              <DropdownItem href="//atlassian.com" target="_new">
                A link item
              </DropdownItem>
            </DropdownItemGroup>
          </Dropdown>
        ) : (
          <Lock size={14} />
        )}
      </div>
    );
  }
}
