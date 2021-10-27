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
  Header?: React.FC<any>;
  /** Grouper form allow for specifying grouping behavior for this field */
  Cell?: React.FC<any>;
  /** Grouper form allow for specifying grouping behavior for this field */
  Footer?: React.FC<any>;
  /** Grouper form allow for specifying grouping behavior for this field */
  Filter?: React.FC<any>;
  /** Grouper form allow for specifying grouping behavior for this field */
  Grouper?: React.FC<any>;
  /** Grouper form allow for specifying grouping behavior for this field */
  cellProps?: any;
  cellStyle?: any;
  primary?: boolean;
  fieldGroup?: FieldGroupIdentifier;
  aggregate?: string;
  mocks?:
    | {
        value: string | string[];
        values: string[] | Array<any>;
        options?: Array<{ id: string | number; name: string }>;
      }
    | Promise<{
        value: string | string[];
        values: string[] | Array<any>;
        options?: Array<{ id: string | number; name: string }>;
      }>;
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
