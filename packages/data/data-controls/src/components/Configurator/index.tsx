import Popup, { TriggerProps } from '@uidu/popup';
import React, { useCallback, useState } from 'react';
import { Trigger as StyledTrigger } from '../../styled';
import { ConfiguratorProps } from './types';

export default function Configurator<T>({
  isConfiguratorOpen = false,
  active,
  configurator: ConfiguratorForm,
  icon: Icon,
  name,
  tableInstance,
}: ConfiguratorProps<T>) {
  const [isDialogOpen, setIsDialogOpen] = useState(isConfiguratorOpen);

  const Trigger = useCallback(
    (triggerProps: TriggerProps) => (
      <StyledTrigger
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...triggerProps}
        activeBg="#d0f0fd"
        active={active}
        onClick={() => setIsDialogOpen((prevIsDialogOpen) => !prevIsDialogOpen)}
        iconBefore={<Icon strokeWidth={2} size={14} />}
      >
        <span tw="hidden xl:block">{name}</span>
      </StyledTrigger>
    ),
    [name, active, Icon],
  );

  const Content = useCallback(
    () => (
      <div tw="w-screen sm:([max-width:400px])">
        <ConfiguratorForm
          tableInstance={tableInstance}
          fallback={<div>Loading...</div>}
        />
      </div>
    ),
    [ConfiguratorForm, tableInstance],
  );

  return (
    <Popup
      isOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      placement="bottom-start"
      trigger={Trigger}
      content={Content}
    />
  );
}
