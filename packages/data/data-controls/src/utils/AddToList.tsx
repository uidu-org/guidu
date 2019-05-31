import Dropdown, { DropdownItem, DropdownItemGroup } from '@uidu/dropdown-menu';
import React, { Component } from 'react';
import { ChevronDown } from 'react-feather';

export default class AddToList extends Component<any> {
  render() {
    const { fields, list, onClick, label } = this.props;
    return (
      <Dropdown
        trigger={
          <p className="mb-0">
            {label} <ChevronDown size={16} />
          </p>
        }
      >
        <DropdownItemGroup>
          {fields
            .filter(f => list.map(s => s.colId.colId).indexOf(f.colId) < 0)
            .map(field => (
              <DropdownItem key={field.colId} onClick={() => onClick(field)}>
                {field.headerName}
              </DropdownItem>
            ))}
        </DropdownItemGroup>
      </Dropdown>
    );
  }
}
