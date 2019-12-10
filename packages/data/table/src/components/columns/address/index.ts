import { addressField } from '@uidu/data-fields';

export default () => ({
  filter: 'agTextColumnFilter',
  type: addressField.kind,
  viewType: addressField.kind,
  headerComponentParams: {
    menuIcon: addressField.icon,
  },
});
