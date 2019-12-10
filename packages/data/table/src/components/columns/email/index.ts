import { emailField } from '@uidu/data-fields';

export default () => ({
  type: emailField.kind,
  viewType: emailField.kind,
  filter: 'agTextColumnFilter',
  headerComponentParams: { menuIcon: emailField.icon },
});
