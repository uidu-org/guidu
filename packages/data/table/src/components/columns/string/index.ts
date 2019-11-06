import { stringField } from '@uidu/data-fields';

export default () => ({
  type: stringField.kind,
  filter: 'agTextColumnFilter',
  headerComponentParams: { menuIcon: stringField.icon },
});
