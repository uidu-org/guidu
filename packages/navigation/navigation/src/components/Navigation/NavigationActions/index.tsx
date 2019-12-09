import Tooltip from '@uidu/tooltip';
import React from 'react';
import DropdownActions from './DropdownActions';
import { StyledNavigationAction, StyledNavigationActions } from './styled';

export default function NavigationActions({
  actions = [],
  onToggle,
  isCollapsed = false,
}) {
  return (
    <StyledNavigationActions>
      {actions.map(action => {
        if (action.actions) {
          return <DropdownActions action={action} onToggle={onToggle} />;
        }

        return (
          <StyledNavigationAction
            type="button"
            onClick={action.onClick}
            className="btn btn-sm px-2"
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
    </StyledNavigationActions>
  );
}
