import { avatarField } from '@uidu/data-fields';

export default () => ({
  type: avatarField.kind,
  sortable: false,
  headerComponentParams: {
    menuIcon: avatarField.icon,
  },
});
