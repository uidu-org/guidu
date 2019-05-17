// import SingleSelectRenderer from '../renderers/SingleSelect';
import SingleSelectEditor from '../editors/SingleSelect';

export default field => ({
  cellEditorFramework: SingleSelectEditor,
  cellEditorParams: {
    options: field.options,
  },
  filter: 'agTextColumnFilter',
  // cellRendererFramework: SingleSelectRenderer,
});
