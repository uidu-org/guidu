import { coverField } from '@uidu/data-fields';

export default () => ({
  viewType: 'cover',
  type: coverField.kind,
  sortable: false,
  headerComponentParams: {
    menuIcon: coverField.icon,
  },
});
