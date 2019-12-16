import { AgGridColumnProps } from '@ag-grid-community/react';
import { Field } from '@uidu/data-fields';

export type ColumnGroupIdentifier = {
  kind: string;
  name: any;
};

export type ColumnGroup = ColumnGroupIdentifier & {
  columns: Column[];
};

export type Column = AgGridColumnProps & {
  dataField?: Field['kind'];
  dataFieldParams?: any;
  primary?: boolean;
  viewType?: string;
  fieldGroup?: ColumnGroupIdentifier;
};

export type TableProps = {
  theme: string;
  columnDefs: Array<Column>;
  innerRef?: React.RefObject<any>;
  rowData: Array<any>;
};
