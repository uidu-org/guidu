import { avatarField } from '@uidu/data-fields';

export default () => ({
  type: avatarField.id,
  sortable: false,
  headerComponentParams: {
    menuIcon: avatarField.icon,
  },
});
