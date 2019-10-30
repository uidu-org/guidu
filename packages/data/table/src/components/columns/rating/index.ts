import { ratingField } from '@uidu/data-fields';

export default () => ({
  type: ratingField.id,
  filter: 'agTextColumnFilter',
  headerComponentParams: { menuIcon: ratingField.icon },
});
