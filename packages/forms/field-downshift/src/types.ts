import * as React from 'react';

export type FieldDownshiftProps = {
  menu: (props) => void;
  item: (props) => void;
  itemsGetter: (props) => Array<any>;
  items: Array<any>;
  wrapper: React.ComponentClass;
  input: (props) => void;
  onSetValue: (value) => void;
  onChange: (name, value) => void;
  name: string;
  value: any;
};
