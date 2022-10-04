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
  atom: true,
  attrs: {
    url: { default: '' },
  },
  parseDOM: [
    {
      tag: 'div[data-node-type="video"]',
      getAttrs: (dom) => ({
        layout: (dom as HTMLElement).getAttribute('data-layout') || 'center',
        width: Number((dom as HTMLElement).getAttribute('data-width')) || null,
      }),
    },
  ],
  toDOM(node: Node) {
    const { layout, width } = node.attrs;
    const attrs = {
      'data-node-type': 'mediaSingle',
      'data-layout': layout,
      'data-width': '',
    };

    if (width) {
      attrs['data-width'] =
        isFinite(width) && Math.floor(width) === width
          ? width
          : width.toFixed(2);
    }

    console.log(attrs, 'attrs');

    return ['div', attrs, 0];
  },
};
