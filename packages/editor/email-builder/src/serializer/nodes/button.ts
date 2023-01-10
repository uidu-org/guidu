import { SerializedNodeData } from '@craftjs/core';

export default function button({ props }: SerializedNodeData) {
  const { text } = props;
  console.log(props);
  // should parse content from email serializer
  return `<mj-button>${text}</mj-button>`;
}
