import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import React, { useState } from 'react';
import { StyledNavigationAction } from './styled';

const DropdownActions = ({ onToggle, action: { icon, actions } }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu
      position="bottom right"
      isOpen={isOpen}
      onOpenChange={params => {
        setIsOpen(params.isOpen);
        onToggle(params);
      }}
      trigger={
        <StyledNavigationAction
          type="button"
          onClick={e => {
            setIsOpen(!isOpen);
          }}
          className="btn btn-sm px-2"
        >
          {icon}
        </StyledNavigationAction>
      }
    >
      {actions.map(action => {
        if (action.actions) {
          return (
            <DropdownItemGroup title={action.text}>
              {action.actions.map(({ onClick, text, icon }) => (
                <DropdownItem onClick={onClick} elemBefore={icon}>
                  {text}
                </DropdownItem>
              ))}
            </DropdownItemGroup>
          );
        }
        return (
          <DropdownItem onClick={action.onClick} elemBefore={action.icon}>
            {action.text}
          </DropdownItem>
        );
      })}
    </DropdownMenu>
  );
};

export default DropdownActions;
