import React from 'react';

export type FieldKind =
  | 'addField'
  | 'address'
  | 'appointment'
  | 'attachments'
  | 'avatar'
  | 'checkbox'
  | 'collection'
  | 'contact'
  | 'country'
  | 'cover'
  | 'currency'
  | 'date'
  | 'email'
  | 'member'
  | 'multipleSelect'
  | 'number'
  | 'paymentMethod'
  | 'percent'
  | 'phone'
  | 'progress'
  | 'rating'
  | 'singleSelect'
  | 'string'
  | 'text'
  | 'uid'
  | 'url'
  | 'vote';

export type FieldDefinition = {};

export type Field = {
  accessor: String | ((originalRow: any, rowIndex: number) => any);
  kind: FieldKind;
  name: string | React.ReactNode;
  icon: React.ReactNode;
  color?: string;
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
  mocks?: {
    value: string;
    options?: Array<{ id: string | number; name: string }>;
  };
  /** Private fields are not editable via interface nor visible to column lists */
  isPrivate?: boolean;
};

export type FieldGroupIdentifier = {
  kind: string;
  name: any;
};

export type FieldGroup = FieldGroupIdentifier & {
  columns: Field[];
};
