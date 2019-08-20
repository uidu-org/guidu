import { avatarUrl } from '../examples-util/data';
import fullAvatarExample from '../examples-util/fullAvatarExample';

export default () =>
  fullAvatarExample({
    appearance: 'circle',
    src: avatarUrl,
  });
