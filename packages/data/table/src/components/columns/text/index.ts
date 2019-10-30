import { textField } from '@uidu/data-fields';

export default () => ({
  type: textField.id,
  filter: 'agTextColumnFilter',
  cellEditor: 'agLargeTextCellEditor',
  headerComponentParams: { menuIcon: textField.icon },
});
