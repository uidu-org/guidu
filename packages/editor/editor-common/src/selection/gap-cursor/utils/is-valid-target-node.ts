import { Node as PMNode } from 'prosemirror-model';

import isIgnored from './is-ignored';

const isValidTargetNode = (node?: PMNode | null): boolean =>
  !!node && !isIgnored(node);

export default isValidTargetNode;
