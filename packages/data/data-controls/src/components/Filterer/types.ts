import { Field } from '@uidu/data-fields';

export type FiltererProps = {
  tableInstance: any;
  columnDefs: Field[];
};

export type FiltererFormProps = {
  closePopup: () => void;
};
