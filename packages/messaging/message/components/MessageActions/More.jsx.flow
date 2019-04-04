import React, { Component } from 'react';
import Tooltip from '@uidu/tooltip';
import DropdownMenu, {
  DropdownItemGroup,
  DropdownItem,
} from '@uidu/dropdown-menu';

import { MoreHorizontal } from 'react-feather';

export default class More extends Component {
  render() {
    const { actions } = this.props;
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
          boundariesElement="viewport"
          onOpenChange={e => console.log('dropdown opened', e)}
        >
          <DropdownItemGroup>
            {actions.map(action => (
              <DropdownItem>{action.name}</DropdownItem>
            ))}
          </DropdownItemGroup>
        </DropdownMenu>
      </div>
    );
  }
}
