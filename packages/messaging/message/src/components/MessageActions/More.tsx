import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import Tooltip from '@uidu/tooltip';
import React, { Component } from 'react';
import { MoreHorizontal } from 'react-feather';

export default class More extends Component<any> {
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
              content="More"
              delay={0}
            >
              <MoreHorizontal size={16} />
            </Tooltip>
          }
          triggerType="default"
          position="top middle"
          boundariesElement="scrollParent"
          onOpenChange={onOpenChange}
        >
          <DropdownItemGroup>
            {actions.map(action => (
              <DropdownItem
                key={action.name}
                onClick={action.onClick}
                {...action.props}
              >
                {action.name}
              </DropdownItem>
            ))}
          </DropdownItemGroup>
        </DropdownMenu>
      </div>
    );
  }
}
