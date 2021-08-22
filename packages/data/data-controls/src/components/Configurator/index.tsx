import Drawer from '@uidu/drawer';
import React, { useState } from 'react';
import { Trigger } from '../../styled';
import DrawerLayout from '../../utils/DrawerLayout';
import { ConfiguratorProps } from './types';

export default function Configurator({
  isConfiguratorOpen = false,
  active,
  configurator: ConfiguratorForm,
  icon: Icon,
  name,
  currentView,
  ...rest
}: ConfiguratorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(isConfiguratorOpen);

  return (
    <>
      <Trigger
        activeBg="#d0f0fd"
        className="btn mr-2"
        active={active}
        onClick={() => setIsDialogOpen(true)}
      >
        <Icon strokeWidth={2} size={14} />
        <span tw="hidden xl:block text-transform[initial]">{name}</span>
      </Trigger>
      <Drawer
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
        origin="right"
        size="wide"
      >
        <DrawerLayout name={name}>
          <ConfiguratorForm fallback={<div>Loading...</div>} {...rest} />
        </DrawerLayout>
      </Drawer>
    </>
  );
}
