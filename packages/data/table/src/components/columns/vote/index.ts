import { voteField } from '@uidu/data-fields';

export default () => ({
  type: voteField.id,
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: voteField.icon,
  },
});
