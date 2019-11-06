import { Field } from '@uidu/data-fields';
import { AgGridColumnProps } from 'ag-grid-react';

export type Column = AgGridColumnProps & {
  dataField: Field;
};

export type TableProps = {
  theme: string;
  columnDefs: Array<Column>;
  innerRef?: React.RefObject<any>;
  rowData: Array<any>;
};
