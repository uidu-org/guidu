import loadable from '@loadable/component';
import { ColumnDef } from '@tanstack/react-table';

const Filter = loadable(
  () => import('../../components/filters/SelectFilterForm'),
);

const WithOptions = (
  props: Partial<ColumnDef<unknown>>,
): Partial<ColumnDef<unknown>> => ({
  ...props,
  Filter: Filter,
});

export default WithOptions;
