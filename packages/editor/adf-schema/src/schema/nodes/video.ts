import { NodeSpec } from 'prosemirror-model';

/**
 * @name video_node
 */

export interface VideoDefinition {
  type: 'video';
  attrs: {
    /**
     * @minLength 1
     */
    url: string;
  };
}

export const video: NodeSpec = {
  inline: false,
  group: 'block',
  selectable: true,
  attrs: {
    url: { default: '' },
  },
  parseDOM: [
    {
      tag: 'div[data-node-type="video"]',
      getAttrs: (dom) => ({
        url: (dom as HTMLElement).getAttribute('data-url') || '',
      }),
    },
  ],
  toDOM(node: Node) {
    const { url } = node.attrs;
    const attrs = {
      'data-node-type': 'video',
      'data-url': url,
    };

    return ['div', attrs, 0];
  },
};
