import { uidField } from '@uidu/data-fields';
import Renderer from './renderer';

export default (field) => ({
  type: uidField.kind,
  viewType: uidField.kind,
  headerComponentParams: { menuIcon: uidField.icon },
  headerName: 'ID',
  pinned: 'left',
  lockVisible: true,
  lockPinned: true,
  lockPosition: true,
  resizable: false,
  // checkboxSelection: true,
  // headerCheckboxSelection: true,
  minWidth: 56,
  width: 56,
  maxWidth: 56,
  disableResizing: true,
  suppressMenu: true,
  sortable: false,
  cellStyle: {
    padding: '0rem',
    borderRight: 0,
  },
  headerClass: 'border-right-0 pr-0',
  headerValueGetter: () => null,
  cellRenderer: Renderer,
  cellRendererParams: {
    onItemClick: field.onItemClick,
  },
});
