import { FilterModel, Group, Sort } from '@uidu/data-controls';

export type DataView = {
  id: string | number;
  kind: string;
  name: string | React.ReactNode;
  fields: String[];
  sorters: Sort[];
  groupers: Group[];
  filterModel: FilterModel;
  primaryField?: any;
};
