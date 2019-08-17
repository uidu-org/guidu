import { FormHandleSubmit } from '@uidu/form';

export type FiltererProps = {
  onChange: FormHandleSubmit;
  filters: Array<any>;
  fields: Array<any>;
};
