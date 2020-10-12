import { FilterModel, Group, Sort } from '@uidu/data-controls';
import React, { ReactNode } from 'react';

export type DataViewKind = {
  id: string;
  name: string | React.ReactNode;
  icon: React.ReactNode;
  color: string;
  description?: React.ReactNode;
  controls?: React.FC<any>;
  configurator?: React.FC<any>;
};

export type DataViewPreferences = {
  // table
  rowHeight?: number;
  // gallery
  columnCount?: number;
  // calendar & gantt
  startDateField?: string;
  endDateField?: string;
  calendarView?: string;
  // board
  primaryField?: string;
};

export type DataView = {
  id: string | number;
  kind: DataViewKind['id'];
  name: string | ReactNode;
  fields: String[];
  sorters: Sort[];
  groupers: Group[];
  filterModel: FilterModel;
  state: any;
  preferences?: DataViewPreferences;
};
