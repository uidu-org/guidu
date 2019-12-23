import { ColumnState } from '@ag-grid-community/core/dist/es6/columnController/columnController';
import { FilterModel, Group, Sort } from '@uidu/data-controls';

export type DataViewPreferences = {
  rowHeight?: number;
  columnCount?: number;
};

export type DataView = {
  id: string | number;
  kind: string;
  name: string | React.ReactNode;
  fields: String[];
  sorters: Sort[];
  groupers: Group[];
  filterModel: FilterModel;
  state: ColumnState[];
  preferences?: DataViewPreferences;
};
