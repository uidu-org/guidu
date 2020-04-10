import { MarkSpec } from 'prosemirror-model';
import { B400 } from '../../utils/colors';
import { SEARCH_QUERY } from '../groups';

export const typeAheadQuery: MarkSpec = {
  inclusive: true,
  group: SEARCH_QUERY,
  parseDOM: [{ tag: 'span[data-type-ahead-query]' }],
  toDOM(node) {
    return [
      'span',
      {
        'data-type-ahead-query': 'true',
        'data-trigger': node.attrs.trigger,
        style: `color: ${B400}`,
      },
    ];
  },
  attrs: {
    trigger: { default: '' },
  },
};
