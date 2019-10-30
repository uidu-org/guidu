import { countryField } from '@uidu/data-fields';

export default () => ({
  type: countryField.id,
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: countryField.icon,
  },
});
