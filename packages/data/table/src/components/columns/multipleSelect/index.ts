import { multipleSelectField } from '@uidu/data-fields';

export default field => ({
  type: multipleSelectField.id,
  cellEditorParams: {
    options: field.options,
  },
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: multipleSelectField.icon,
  },
});
