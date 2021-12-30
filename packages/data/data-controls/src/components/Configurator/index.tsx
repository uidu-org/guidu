import Popup from '@uidu/popup';
import React, { useState } from 'react';
import { Trigger } from '../../styled';
import { ConfiguratorProps } from './types';

export default function Configurator({
  isConfiguratorOpen = false,
  active,
  configurator: ConfiguratorForm,
  icon: Icon,
  name,
}: ConfiguratorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(isConfiguratorOpen);

  return (
    <Popup
      isOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      placement="bottom-start"
      trigger={(triggerProps) => (
        <Trigger
          {...triggerProps}
          activeBg="#d0f0fd"
          active={active}
          onClick={() =>
            setIsDialogOpen((prevIsDialogOpen) => !prevIsDialogOpen)
          }
          iconBefore={<Icon strokeWidth={2} size={14} />}
        >
          <span tw="hidden xl:block">{name}</span>
        </Trigger>
      )}
      content={() => {
        return (
          <div tw="w-screen sm:width[500px] py-4 text-sm">
            <ConfiguratorForm fallback={<div>Loading...</div>} />
          </div>
        );
      }}
    />
  );
}
