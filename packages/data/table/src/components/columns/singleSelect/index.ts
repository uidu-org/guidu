import { singleSelectField } from '@uidu/data-fields';
import Editor from '../multipleSelect/editor';
import Renderer from './renderer';

export default field => ({
  type: singleSelectField.kind,
  cellEditorFramework: Editor,
  cellEditorParams: {
    values: field.options,
    formatValue: option => {
      return option ? option.name : '';
    },
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
