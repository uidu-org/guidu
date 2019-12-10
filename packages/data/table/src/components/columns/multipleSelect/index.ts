import { multipleSelectField } from '@uidu/data-fields';

export default field => ({
  type: multipleSelectField.kind,
  viewType: multipleSelectField.kind,
  cellEditorParams: {
    options: field.options,
  },
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: multipleSelectField.icon,
  },
});
