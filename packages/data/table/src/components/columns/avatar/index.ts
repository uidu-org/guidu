import { avatarField } from '@uidu/data-fields';

export default () => ({
  viewType: avatarField.kind,
  type: avatarField.kind,
  sortable: false,
  headerComponentParams: {
    menuIcon: avatarField.icon,
  },
});
