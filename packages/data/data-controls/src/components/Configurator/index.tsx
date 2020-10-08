import { byName } from '@uidu/data-views';
import Drawer from '@uidu/drawer';
import Tooltip from '@uidu/tooltip';
import React, { useState } from 'react';
import { Settings } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';
import DrawerLayout from '../../utils/DrawerLayout';
import { ConfiguratorProps } from './types';

export default function Configurator({
  isConfiguratorOpen = false,
  currentView,
  ...rest
}: ConfiguratorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(isConfiguratorOpen);
  const dataView = byName[currentView.kind];

  const { configurator: ConfiguratorForm } = dataView;

  return (
    <>
      <Tooltip content={'Configure this view'} position="bottom">
        <Trigger
          activeBg="#d0f0fd"
          className="btn"
          onClick={() => setIsDialogOpen(true)}
        >
          <Settings strokeWidth={2} size={14} />
        </Trigger>
      </Tooltip>
      <Drawer
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
        origin="right"
        size="wide"
      >
        <DrawerLayout
          name={
            <FormattedMessage
              id="guidu.data_controls.configurator.label"
              defaultMessage="Configure {name}"
              values={{ name: dataView.name }}
            />
          }
        >
          <ConfiguratorForm fallback={<div>Loading...</div>} {...rest} />
        </DrawerLayout>
      </Drawer>
    </>
  );
}
