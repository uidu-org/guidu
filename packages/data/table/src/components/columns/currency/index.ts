import { currencyField } from '@uidu/data-fields';
import { numericComparator } from '../../../utils';

export default () => ({
  type: ['numericColumn', currencyField.id],
  filter: 'agNumberColumnFilter',
  valueFormatter: ({ value }) => value,
  headerComponentParams: { menuIcon: currencyField.icon },
  comparator: numericComparator,
});
