import React from 'react';

export type ConfiguratorProps = {
  active?: boolean;
  configurator?: React.FC<any>;
  icon: React.FC<any>;
  name: string | React.ReactNode;
  isConfiguratorOpen?: boolean;
};
