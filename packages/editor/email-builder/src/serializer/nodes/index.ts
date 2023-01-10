import button from './button';
import container from './container';
import divider from './divider';
import text from './text';
import video from './video';

const nodeSerializers = {
  Button: button,
  Container: container,
  Divider: divider,
  Text: text,
  Video: video,
};

export default nodeSerializers;
