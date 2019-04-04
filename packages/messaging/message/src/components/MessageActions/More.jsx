import React, { Component } from 'react';
import Tooltip from '@uidu/tooltip';
import DropdownMenu, {
  DropdownItemGroup,
  DropdownItem,
} from '@uidu/dropdown-menu';

import { MoreHorizontal } from 'react-feather';

export default class More extends Component {
  render() {
    const { actions, onOpenChange } = this.props;
    return (
      <div className="btn-group btn-group-sm" role="group">
        <DropdownMenu
          trigger={
            <Tooltip
              tag="button"
              className="btn btn-sm bg-white border py-1 px-3 d-flex align-items-center"
              placement="top"
              content="Add a reaction"
              delay={0}
            >
              <MoreHorizontal size={16} />
            </Tooltip>
          }
          triggerType="default"
          position="top middle"
          // boundariesElement="viewport"
          onOpenChange={onOpenChange}
        >
          <DropdownItemGroup>
            {actions.map(action => (
              <DropdownItem key={action.name} onClick={action.onClick}>
                {action.name}
              </DropdownItem>
            ))}
          </DropdownItemGroup>
        </DropdownMenu>
      </div>
    );
  }
}
