import { avatarField } from '@uidu/data-fields';

export default () => ({
  viewType: 'avatar',
  type: avatarField.kind,
  sortable: false,
  headerComponentParams: {
    menuIcon: avatarField.icon,
  },
});
