import { stringField } from '@uidu/data-fields';

export default () => ({
  type: stringField.id,
  filter: 'agTextColumnFilter',
  headerComponentParams: { menuIcon: stringField.icon },
});
