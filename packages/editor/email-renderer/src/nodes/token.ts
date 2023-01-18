import { createTag } from '../create-tag';
import { NodeSerializerOpts } from '../interfaces';
import { createClassName } from '../styles/util';

const className = createClassName('video');

export const styles = `
.${className} {
}
`;

export default function token({ attrs }: NodeSerializerOpts) {
  const { id, name } = attrs;

  return createTag('span', { class: className }, `{{${id}}}`);
}
