import loadable from '@loadable/component';
import { Field } from '../../types';

const Filter = loadable(
  () => import('../../components/filters/SelectFilterForm'),
);

const WithOptions = (props: Partial<Field>): Partial<Field> => ({
  ...props,
  Filter,
});

export default WithOptions;
