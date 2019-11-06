import { voteField } from '@uidu/data-fields';

export default () => ({
  type: voteField.kind,
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: voteField.icon,
  },
});
