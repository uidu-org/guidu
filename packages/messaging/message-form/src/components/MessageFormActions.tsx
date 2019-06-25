import Dropdown, { DropdownItem, DropdownItemGroup } from '@uidu/dropdown-menu';
import React, { PureComponent } from 'react';
import { Plus } from 'react-feather';

export default class MessageFormActions extends PureComponent<any> {
  render() {
    const { actions } = this.props;
    return (
      <Dropdown
        className="align-self-center"
        trigger={
          <button
            className="btn btn-sm d-none d-md-flex align-items-center mb-0 text-muted px-2 px-xl-3 shadow-none"
            type="button"
          >
            <Plus size={18} />
          </button>
        }
      >
        {actions.map(actionGroup => (
          <DropdownItemGroup key={actionGroup.name} title={actionGroup.name}>
            {actionGroup.children.map((action, index) => (
              <DropdownItem key={index} {...action} />
            ))}
          </DropdownItemGroup>
        ))}
      </Dropdown>
    );
  }
}
