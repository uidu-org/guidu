export default () => ({
  type: 'uid',
  headerName: 'ID',
  pinned: true,
  lockVisible: true,
  checkboxSelection: true,
  headerCheckboxSelection: true,
  width: 80,
  maxWidth: 80,
  suppressMenu: true,
  sortable: false,
  cellStyle: { borderRight: 0 },
  headerValueGetter: () => null,
});
