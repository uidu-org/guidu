import { multipleSelectField } from '@uidu/data-fields';
import SelectEditor from '../../editors/SelectEditor';

export default field => ({
  type: multipleSelectField.kind,
  viewType: multipleSelectField.kind,
  cellEditorFramework: SelectEditor,
  cellEditorParams: {
    options: field.options,
    multiple: true,
  },
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: multipleSelectField.icon,
  },
});
