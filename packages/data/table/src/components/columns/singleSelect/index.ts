import { singleSelectField } from '@uidu/data-fields';

export default field => ({
  type: singleSelectField.kind,
  cellEditorParams: {
    options: field.options,
  },
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: singleSelectField.icon,
  },
});
