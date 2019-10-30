import { emailField } from '@uidu/data-fields';

export default () => ({
  type: emailField.id,
  filter: 'agTextColumnFilter',
  headerComponentParams: { menuIcon: emailField.icon },
});
