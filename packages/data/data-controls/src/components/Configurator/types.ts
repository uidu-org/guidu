import { Table } from '@tanstack/react-table';
import React from 'react';

export type ConfiguratorProps<T> = {
  active?: boolean;
  configurator?: React.FC<any>;
  icon: React.FC<any>;
  name: string | React.ReactNode;
  isConfiguratorOpen?: boolean;
  tableInstance: Table<T>;
};
