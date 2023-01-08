import { createTag } from '../create-tag';
import { NodeSerializerOpts } from '../interfaces';

export default function layoutSection({ text }: NodeSerializerOpts) {
  return createTag('div', {}, text);
}
