import { contactField } from '@uidu/data-fields';
import Editor from './editor';
import Renderer from './renderer';

export default field => ({
  type: contactField.kind,
  viewType: contactField.kind,
  cellRenderer: Renderer,
  cellRendererParams: field,
  cellEditorFramework: Editor,
  cellEditorParams: {
    options: field.options,
  },
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: contactField.icon,
  },
  // filterValueGetter: params => params.data[field.colId],
});
