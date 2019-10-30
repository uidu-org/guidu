import { addressField } from '@uidu/data-fields';

export default () => ({
  filter: 'agTextColumnFilter',
  type: addressField.id,
  headerComponentParams: {
    menuIcon: addressField.icon,
  },
});
