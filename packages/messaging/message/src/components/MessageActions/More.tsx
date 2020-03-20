import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import Tooltip from '@uidu/tooltip';
import React from 'react';
import { MoreHorizontal } from 'react-feather';

export default function More({ actions, onOpenChange }) {
  return (
    <DropdownMenu
      trigger={
        <Tooltip
          tag="button"
          className="btn btn-sm bg-white text-muted p-2 d-flex align-items-center"
          position="top"
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
  );
}
