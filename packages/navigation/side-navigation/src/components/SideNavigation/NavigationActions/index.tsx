import Tooltip from '@uidu/tooltip';
import React from 'react';
import DropdownActions from './DropdownActions';
import { StyledNavigationAction } from './styled';

export default function NavigationActions({
  actions = [],
  onToggle,
  isCollapsed = false,
}) {
  return (
    <div tw="space-x-1 flex">
      {actions.map((action) => {
        if (action.actions) {
          return (
            <DropdownActions
              action={action}
              onToggle={onToggle}
              isCollapsed={isCollapsed}
            />
          );
        }

        return (
          <StyledNavigationAction
            type="button"
            onClick={(e) => {
              e.preventDefault();
              action.onClick(e);
            }}
            tw="p-0.5"
            isCollapsed={isCollapsed}
          >
            {action.tooltip ? (
              <Tooltip content={action.tooltip} position="top" delay={0}>
                {action.icon}
              </Tooltip>
            ) : (
              action.icon
            )}
          </StyledNavigationAction>
        );
      })}
    </div>
  );
}
