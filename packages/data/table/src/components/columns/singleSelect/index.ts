import { singleSelectField } from '@uidu/data-fields';
import SelectEditor from '../../editors/SelectEditor';
import Renderer from './renderer';

export default field => ({
  type: singleSelectField.kind,
  viewType: singleSelectField.kind,
  cellEditorFramework: SelectEditor,
  cellEditorParams: {
    options: field.options,
  },
  cellRendererParams: {
    options: field.options,
  },
  cellRenderer: Renderer,
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: singleSelectField.icon,
  },
  keyCreator: params => params.value.name,
  filterValueGetter: params => params.data[field.colId],
  valueGetter: ({ data }) =>
    data
      ? field.options.filter(option => option.id === data[field.colId])[0]
      : null,
});
