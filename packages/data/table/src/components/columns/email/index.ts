import { emailField } from '@uidu/data-fields';

export default () => ({
  type: emailField.kind,
  filter: 'agTextColumnFilter',
  headerComponentParams: { menuIcon: emailField.icon },
});
