import {
  DropdownItemGroupCheckbox,
  withToggleInteraction,
} from '@uidu/dropdown-menu';
import Item, { withItemFocus } from '@uidu/item';
import { ToggleStateless } from '@uidu/toggle';
import React, { Component } from 'react';
import { Settings } from 'react-feather';
import { Trigger } from '../../styled';
import DropdownMenu from '../../utils/DropdownMenu';

const DropdownItem = withToggleInteraction(
  withItemFocus(Item),
  ({ isSelected }) => {
    return (
      <ToggleStateless isChecked={isSelected} className="mr-2" size="xsmall" />
    );
  },
  () => 'checkbox',
);

export default class Toggler extends Component<any> {
  render() {
    const { fields, onSortEnd, onToggle, api } = this.props;

    return (
      <DropdownMenu
        trigger={
          <Trigger activeBg="#d0f0fd" className="btn">
            <Settings strokeWidth={2} size={14} className="mr-2" />
            <span style={{ textTransform: 'initial' }}>Personalizza</span>
          </Trigger>
        }
      >
        <DropdownItemGroupCheckbox id="fields">
          {fields
            .filter(f => !f.pinned)
            .map(field => (
              <DropdownItem
                id={field.colId}
                defaultSelected
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggle(field.colId, !!field.hide);
                }}
              >
                <div style={{ maxWidth: 160 }} className="text-truncate">
                  {field.headerComponentParams &&
                  field.headerComponentParams.menuIcon ? (
                    <small className="mr-2">
                      {field.headerComponentParams.menuIcon}
                    </small>
                  ) : null}
                  {field.headerName}
                </div>
              </DropdownItem>
            ))}
        </DropdownItemGroupCheckbox>
      </DropdownMenu>
    );
  }
}
