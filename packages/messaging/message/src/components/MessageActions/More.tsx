import Button from '@uidu/button';
import { ButtonItem, MenuGroup } from '@uidu/menu';
import Popup from '@uidu/popup';
import React, { useState } from 'react';
import { MoreHorizontal } from 'react-feather';

export default function More({ actions, onOpenChange }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popup
      isOpen={isOpen}
      trigger={(triggerProps) => (
        <Button
          {...triggerProps}
          onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
          iconBefore={<MoreHorizontal size={16} />}
        />
      )}
      content={() => (
        <MenuGroup>
          {actions.map((action) => (
            <ButtonItem
              key={action.name}
              onClick={action.onClick}
              {...action.props}
            >
              {action.name}
            </ButtonItem>
          ))}
        </MenuGroup>
      )}
      position="top middle"
      boundariesElement="scrollParent"
      onOpenChange={onOpenChange}
    />
  );
}
