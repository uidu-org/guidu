import { Field } from '@uidu/data-fields';

export type ColumnGroupIdentifier = {
  kind: string;
  name: any;
};

export type ColumnGroup = ColumnGroupIdentifier & {
  columns: Column[];
};

export type Column = Field & {
  cellProps?: any;
  primary?: boolean;
  fieldGroup?: ColumnGroupIdentifier;
};

export type TableProps = {
  theme: string;
  columnDefs: Array<Column>;
  innerRef?: React.RefObject<any>;
  rowData: Array<any>;
};
