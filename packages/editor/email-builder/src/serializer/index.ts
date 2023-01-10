import { SerializedNode } from '@craftjs/core';
import nodeSerializers from './nodes';

export function serializeNode(node: SerializedNode) {
  return nodeSerializers[node.type.resolvedName]({
    ...node,
  });
}

export default function serializer(json) {
  let output = `<mjml>`;
  output += `<mj-body>`;
  const root = json.ROOT;
  output += serializeNode({ ...root, json });
  output += `</mj-body>`;
  output += `</mjml>`;
  return output;
}
