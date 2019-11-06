import { urlField } from '@uidu/data-fields';

export default () => ({
  type: urlField.kind,
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: urlField.icon,
  },
});
