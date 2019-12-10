import { ratingField } from '@uidu/data-fields';

export default () => ({
  type: ratingField.kind,
  viewType: ratingField.kind,
  filter: 'agTextColumnFilter',
  headerComponentParams: { menuIcon: ratingField.icon },
});
