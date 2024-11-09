import Button from '@uidu/button';
import Popup, { ContentProps, TriggerProps } from '@uidu/popup';
import React, { useCallback, useEffect, useState } from 'react';
import { DropdownMenuProps } from '../types';

export default function DropdownMenu({
  isOpen: defaultIsOpen = false,
  onOpenChange,
  children,
  trigger,
  triggerComponent: TriggerComponent = Button,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const Trigger = useCallback(
    (triggerProps: TriggerProps) => (
      <TriggerComponent
        {...triggerProps}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {trigger}
      </TriggerComponent>
    ),
    [trigger, TriggerComponent],
  );

  const Content = useCallback(
    (contentProps: ContentProps) => <div>{children}</div>,
    [children],
  );

  useEffect(() => {
    if (onOpenChange) {
      onOpenChange({ isOpen });
    }
  }, [isOpen, onOpenChange]);

  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      // isLoading={isLoading}
      // onOpenChange={this.handleOpenChange}
      placement="auto"
      trigger={Trigger}
      content={Content}
    />
  );
}
