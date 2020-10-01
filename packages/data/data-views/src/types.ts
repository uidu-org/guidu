import { FilterModel, Group, Sort } from '@uidu/data-controls';

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
  kind: string;
  name: string | React.ReactNode;
  fields: String[];
  sorters: Sort[];
  groupers: Group[];
  filterModel: FilterModel;
  state: any;
  preferences?: DataViewPreferences;
};
