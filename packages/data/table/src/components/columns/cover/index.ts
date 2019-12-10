import { coverField } from '@uidu/data-fields';

export default () => ({
  type: coverField.kind,
  viewType: coverField.kind,
  sortable: false,
  headerComponentParams: {
    menuIcon: coverField.icon,
  },
});
