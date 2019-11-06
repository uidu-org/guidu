import { attachmentsField } from '@uidu/data-fields';

export default () => ({
  filter: 'agTextColumnFilter',
  type: attachmentsField.kind,
  headerComponentParams: { menuIcon: attachmentsField.icon },
});
