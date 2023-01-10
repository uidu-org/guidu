import { SerializedNodeData } from '@craftjs/core';
import { serializeNode } from '..';

export default function container({ nodes, json }: SerializedNodeData) {
  let output = '';
  nodes.forEach((nodeId) => {
    const node = json[nodeId];
    output += serializeNode(node);
  });
  return output;
}
