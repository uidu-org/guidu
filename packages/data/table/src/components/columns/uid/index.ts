import { uidField } from '@uidu/data-fields';
import Renderer from './renderer';

export default field => ({
  type: uidField.kind,
  viewType: uidField.kind,
  headerComponentParams: { menuIcon: uidField.icon },
  headerName: 'ID',
  pinned: true,
  lockVisible: true,
  lockPosition: true,
  resizable: false,
  // checkboxSelection: true,
  // headerCheckboxSelection: true,
  width: 84,
  maxWidth: 84,
  suppressMenu: true,
  sortable: false,
  cellStyle: {
    border: 0,
    'padding-right': '0.75rem',
    fontSize: '14px',
  },
  headerClass: 'border-right-0 pr-0',
  headerValueGetter: () => null,
  cellRenderer: Renderer,
  cellRendererParams: {
    onItemClick: field.onItemClick,
  },
});
