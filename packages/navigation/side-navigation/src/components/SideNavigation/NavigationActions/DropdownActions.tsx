import { ButtonItem, MenuGroup, Section } from '@uidu/menu';
import Popup, { TriggerProps } from '@uidu/popup';
import React, { useCallback, useState } from 'react';
import { StyledNavigationAction } from './styled';

function DropdownActions({ onToggle, isCollapsed, action: { icon, actions } }) {
  const [isOpen, setIsOpen] = useState(false);

  const Trigger = useCallback(
    (triggerProps: TriggerProps) => (
      <StyledNavigationAction
        {...triggerProps}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        tw="p-0.5"
        isCollapsed={isCollapsed}
      >
        {icon}
      </StyledNavigationAction>
    ),
    [icon, isCollapsed, isOpen],
  );

  const Content = useCallback(
    () => (
      <MenuGroup>
        {actions.map((action) => {
          if (action.actions) {
            return (
              <Section title={action.text}>
                {action.actions.map(({ onClick, text, icon }) => (
                  <ButtonItem
                    onClick={(e) => {
                      e.preventDefault();
                      onClick(e);
                    }}
                    iconBefore={icon}
                  >
                    {text}
                  </ButtonItem>
                ))}
              </Section>
            );
          }
          return (
            <ButtonItem
              onClick={(e) => {
                e.preventDefault();
                action.onClick(e);
              }}
              iconBefore={action.icon}
            >
              {action.text}
            </ButtonItem>
          );
        })}
      </MenuGroup>
    ),
    [actions],
  );

  return (
    <Popup
      // boundariesElement="scrollParent"
      // position="bottom right"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      // onOpenChange={(params) => {
      //   setIsOpen(params.isOpen);
      //   onToggle(params);
      // }}
      trigger={Trigger}
      content={Content}
    />
  );
}

export default DropdownActions;
