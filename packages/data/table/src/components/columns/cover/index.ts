import { coverField } from '@uidu/data-fields';

export default () => ({
  type: coverField.id,
  sortable: false,
  headerComponentParams: {
    menuIcon: coverField.icon,
  },
});
