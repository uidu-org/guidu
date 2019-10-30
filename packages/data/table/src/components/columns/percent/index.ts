import { percentField } from '@uidu/data-fields';

export default () => ({
  filter: 'agNumberColumnFilter',
  type: ['numericColumn', percentField.id],
  valueFormatter: ({ value }) => `${value}%`,
  headerComponentParams: { menuIcon: percentField.icon },
});
