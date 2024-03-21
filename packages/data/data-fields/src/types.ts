import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

export const FieldKind = {
  addField: 'addField',
  address: 'address',
  appointment: 'appointment',
  attachments: 'attachments',
  avatar: 'avatar',
  checkbox: 'checkbox',
  collection: 'collection',
  contact: 'contact',
  country: 'country',
  cover: 'cover',
  currency: 'currency',
  datetime: 'datetime',
  date: 'date',
  email: 'email',
  member: 'member',
  multipleSelect: 'multipleSelect',
  number: 'number',
  paymentMethod: 'paymentMethod',
  percent: 'percent',
  phone: 'phone',
  progress: 'progress',
  rating: 'rating',
  richText: 'richText',
  singleSelect: 'singleSelect',
  string: 'string',
  text: 'text',
  uid: 'uid',
  url: 'url',
  vote: 'vote',
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type FieldKind = (typeof FieldKind)[keyof typeof FieldKind];

export type FieldDefinition = {};

export type Field<T, K = FieldKind> = Partial<ColumnDef<T>> & {
  accessor: String | ((originalRow: any, rowIndex: number) => any);
  kind: K;
  name: string | React.ReactNode;
  icon: React.ReactNode;
  color?: string;
  description?: React.ReactNode;
  // form?: React.FC<any>;
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
