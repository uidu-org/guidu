import { ADNode } from '@uidu/editor-common';
import { Node as PMNode } from 'prosemirror-model';

export const getText = (node: PMNode | ADNode): string =>
  node.text ||
  (node.attrs && (node.attrs.text || node.attrs.shortName)) ||
  `[${typeof node.type === 'string' ? node.type : node.type.name}]`;

export default getText;
