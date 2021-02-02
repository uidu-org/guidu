import { avatarUrl } from '../examples-utils/data';
import fullAvatarExample from '../examples-utils/fullAvatarExample';

export default () =>
  fullAvatarExample({
    appearance: 'circle',
    src: avatarUrl,
  });
