import { numberField } from '@uidu/data-fields';

export default () => ({
  // cellEditorFramework: DatePicker,
  type: ['numericColumn', numberField.id],
  filter: 'agNumberColumnFilter',
  headerComponentParams: { menuIcon: numberField.icon },
  // valueFormatter: ({ value }) => moment(value).format('L'),
});
