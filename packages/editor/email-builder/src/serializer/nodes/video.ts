import { SerializedNodeData } from '@craftjs/core';
import { VideoProps } from '../../components/Video/types';

export default function video({ props }: SerializedNodeData) {
  const { url, iconColor, iconSize, iconType } = props as VideoProps;
  console.log(props);
  // should parse content from email serializer
  return `<mj-section><mj-column><mj-text>${url}</mj-text></mj-column></mj-section>`;
}
