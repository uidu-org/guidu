import React from 'react';

export type Field = {
  kind: string;
  name: string | React.ReactNode;
  icon: React.ReactNode;
  description?: React.ReactNode;
  form?: React.FC<any>;
  filterForm?: React.FC<any>;
  /** Grouper form allow for specifying grouping behavior for this field */
  grouperForm?: React.FC<any>;
};
