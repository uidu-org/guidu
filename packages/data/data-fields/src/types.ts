import React from 'react';

export type Field = {
  accessor: String | ((originalRow: any, rowIndex: number) => any);
  kind: string;
  name: string | React.ReactNode;
  icon: React.ReactNode;
  description?: React.ReactNode;
  form?: React.FC<any>;
  /** Grouper form allow for specifying grouping behavior for this field */
  grouperForm?: React.FC<any>;
  Header?: React.FC<any>;
  Cell?: React.FC<any>;
  Footer?: React.FC<any>;
  Filter?: React.FC<any>;
  cellProps?: any;
  cellStyle?: any;
  primary?: boolean;
  fieldGroup?: FieldGroupIdentifier;
  aggregate?: string;
};

export type FieldGroupIdentifier = {
  kind: string;
  name: any;
};

export type FieldGroup = FieldGroupIdentifier & {
  columns: Field[];
};
