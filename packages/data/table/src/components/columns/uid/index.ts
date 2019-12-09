import { uidField } from '@uidu/data-fields';

export default () => ({
  type: uidField.kind,
  headerComponentParams: { menuIcon: uidField.icon },
  headerName: 'ID',
  pinned: true,
  lockVisible: true,
  lockPosition: true,
  resizable: false,
  // checkboxSelection: true,
  // headerCheckboxSelection: true,
  width: 60,
  maxWidth: 60,
  suppressMenu: true,
  sortable: false,
  // headerClass: 'border-right-0',
  cellStyle: { fontSize: '14px' },
  headerValueGetter: () => null,
});
