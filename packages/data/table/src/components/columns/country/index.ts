import { countryField } from '@uidu/data-fields';

export default () => ({
  type: countryField.kind,
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: countryField.icon,
  },
});
