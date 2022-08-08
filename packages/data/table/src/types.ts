import { Field } from '@uidu/data-fields';
import React from 'react';

export type ColumnGroupIdentifier = {
  kind: string;
  name: any;
};

export type ColumnGroup = ColumnGroupIdentifier & {
  columns: Column[];
};

export type Column = Field & {
  primary?: boolean;
  fieldGroup?: ColumnGroupIdentifier;
};

export type TableProps = {
  theme: string;
  columnDefs: Array<Column>;
  innerRef?: React.RefObject<any>;
  rowData: Array<any>;
};
