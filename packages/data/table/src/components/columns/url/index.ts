import { urlField } from '@uidu/data-fields';

export default () => ({
  type: urlField.id,
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: urlField.icon,
  },
});
