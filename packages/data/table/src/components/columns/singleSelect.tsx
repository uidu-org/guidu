import { singleSelectField } from '@uidu/data-fields';

export default field => ({
  type: singleSelectField.id,
  cellEditorParams: {
    options: field.options,
  },
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: singleSelectField.icon,
  },
});
