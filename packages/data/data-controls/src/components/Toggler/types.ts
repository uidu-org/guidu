import { Field } from '@uidu/data-fields';

export type TogglerProps = {
  columnDefs: Field[];
  onDragEnd: (params) => void;
};

export type TogglerFormProps = {};
