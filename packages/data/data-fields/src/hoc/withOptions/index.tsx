import loadable from '@loadable/component';
import { Field } from '../../types';

const WithOptionsForm = loadable(() => import('./form'));
const FilterForm = loadable(() => import('../../filters/SelectFilterForm'));

const WithOptions = (props: Field): Field => ({
  ...props,
  form: WithOptionsForm,
  filterForm: FilterForm,
});

export default WithOptions;
