import { NodeSpec } from 'prosemirror-model';

/**
 * @name token_node
 */

export interface TokenDefinition {
  type: 'token';
  attrs: {
    /**
     * @minLength 1
     */
    id: string;
    /**
     * @minLength 1
     */
    name: string;
  };
}

export const token: NodeSpec = {
  inline: true,
  group: 'inline',
  selectable: false,
  attrs: {
    id: { default: '' },
    name: { default: '' },
  },
  parseDOM: [
    {
      tag: 'span[data-node-type="token"]',
      getAttrs: (dom) => ({
        id: (dom as HTMLElement).getAttribute('data-id') || '',
        name: (dom as HTMLElement).getAttribute('data-name') || '',
      }),
    },
  ],
  toDOM(node: Node) {
    const { name, id } = node.attrs;
    const attrs = {
      'data-node-type': 'token',
      'data-id': id,
      'data-name': name,
    };

    return ['span', attrs, name];
  },
};
