import { attachmentsField } from '@uidu/data-fields';

export default () => ({
  filter: 'agTextColumnFilter',
  type: attachmentsField.id,
  headerComponentParams: { menuIcon: attachmentsField.icon },
});
