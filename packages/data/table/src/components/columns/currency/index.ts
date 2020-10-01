import { currencyField } from '@uidu/data-fields';
import { numericComparator } from '../../../utils';

export default () => ({
  type: ['numericColumn', currencyField.kind],
  viewType: currencyField.kind,
  filter: 'agNumberColumnFilter',
  aggregate: 'sum',
  // valueFormatter: ({ value }) => value,
  headerComponentParams: { menuIcon: currencyField.icon },
  comparator: numericComparator,
});
