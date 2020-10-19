import loadable from '@loadable/component';
import { Field } from '../../types';

const WithOptionsForm = loadable(() => import('./form'));
const Filter = loadable(
  () => import('../../components/filters/SelectFilterForm'),
);

const WithOptions = (props: Field): Field => ({
  ...props,
  form: WithOptionsForm,
  Filter,
});

export default WithOptions;
