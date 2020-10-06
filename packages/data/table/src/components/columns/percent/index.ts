import { percentField } from '@uidu/data-fields';

export default () => ({
  filter: 'agNumberColumnFilter',
  type: ['numericColumn', percentField.kind],
  viewType: percentField.kind,
  cellStyle: { textAlign: 'right' },
  valueFormatter: ({ value }) => `${value}%`,
  headerComponentParams: { menuIcon: percentField.icon },
  aggFunc: 'avg',
});
