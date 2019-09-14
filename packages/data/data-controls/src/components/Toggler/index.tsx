import {
  DropdownItemGroupCheckbox,
  withToggleInteraction,
} from '@uidu/dropdown-menu';
import Item, { withItemFocus } from '@uidu/item';
import { ToggleStateless } from '@uidu/toggle';
import React, { Component } from 'react';
import { EyeOff } from 'react-feather';
import { FormattedMessage } from 'react-intl';
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
    const hiddenCount = fields.filter(f => f.hide).length;

    return (
      <DropdownMenu
        trigger={
          <Trigger activeBg="#d0f0fd" active={!!hiddenCount} className="btn">
            <EyeOff strokeWidth={2} size={14} className="mr-2" />
            <span style={{ textTransform: 'initial' }}>
              <FormattedMessage
                id="guidu.data_controls.sorter.label"
                defaultMessage={`{hiddenCount, plural,
                  =0 {Hide fields}
                  one {1 field hidden}
                  other {# fields hidden}
                }`}
                values={{ hiddenCount }}
              />
            </span>
          </Trigger>
        }
      >
        {/* <div className="p-3">
          <input
            type="search"
            className="form-control form-control-sm bg-light border-0 mb-2"
            placeholder="Cerca tra le colonne"
          /> */}
        <DropdownItemGroupCheckbox id="fields">
          {fields
            .filter(f => f.type !== 'primary' && f.type !== 'cover')
            .filter(f => !f.pinned)
            .map(field => (
              <DropdownItem
                key={field.colId}
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
        {/* </div> */}
      </DropdownMenu>
    );
  }
}
