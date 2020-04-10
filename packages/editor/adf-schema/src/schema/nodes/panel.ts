import { Node, NodeSpec } from 'prosemirror-model';
import { BulletListDefinition as BulletList } from './bullet-list';
import { HeadingDefinition as Heading } from './heading';
import { OrderedListDefinition as OrderedList } from './ordered-list';
import { ParagraphDefinition as Paragraph } from './paragraph';

export type PanelType =
  | 'info'
  | 'note'
  | 'tip'
  | 'warning'
  | 'error'
  | 'success';

export interface PanelAttributes {
  panelType: PanelType;
}

/**
 * @name panel_node
 */
export interface PanelDefinition {
  type: 'panel';
  attrs: PanelAttributes;
  /**
   * @minItems 1
   */
  content: Array<Paragraph | Heading | OrderedList | BulletList>;
}

export interface DOMAttributes {
  [propName: string]: string;
}

export const panel: NodeSpec = {
  group: 'block',
  content: '(paragraph | heading | bulletList | orderedList)+',
  attrs: {
    panelType: { default: 'info' },
  },
  parseDOM: [
    {
      tag: 'div[data-panel-type]',
      getAttrs: (dom) => ({
        panelType: (dom as HTMLElement).getAttribute('data-panel-type')!,
      }),
    },
  ],
  toDOM(node: Node) {
    const panelType = node.attrs['panelType'];
    const attrs: DOMAttributes = {
      'data-panel-type': panelType,
    };
    return ['div', attrs, ['div', {}, 0]];
  },
};
