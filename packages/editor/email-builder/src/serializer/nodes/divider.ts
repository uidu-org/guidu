import { SerializedNodeData } from '@craftjs/core';

export default function divider({ props }: SerializedNodeData) {
  // should parse content from email serializer
  return `<mj-divider />`;
}
