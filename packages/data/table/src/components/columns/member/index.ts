import { memberField } from '@uidu/data-fields';
import Editor from './editor';
import Renderer from './renderer';

export default (field) => ({
  type: memberField.kind,
  viewType: memberField.kind,
  cellRenderer: Renderer,
  cellRendererParams: field,
  cellEditorFramework: Editor,
  cellEditorParams: {
    options: field.options,
  },
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: memberField.icon,
  },
  // filterValueGetter: params => params.data[field.id],
});
