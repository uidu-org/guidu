import { singleSelectField } from '@uidu/data-fields';
import Renderer from './renderer';

export default field => ({
  type: singleSelectField.kind,
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
  valueGetter: ({ data }) => field.options.filter(option => option.id === data[field.colId])[0]
});
