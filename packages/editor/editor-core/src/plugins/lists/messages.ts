// Common Translations will live here
import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  unorderedList: {
    id: 'uidu.editor-core.unorderedList',
    defaultMessage: 'Bullet list',
    description: 'A list with bullets. Also known as an “unordered” list',
  },
  unorderedListDescription: {
    id: 'uidu.editor-core.unorderedList.description',
    defaultMessage: 'Create an unordered list',
    description: '',
  },
  orderedList: {
    id: 'uidu.editor-core.orderedList',
    defaultMessage: 'Numbered list',
    description: 'A list with ordered items 1… 2… 3…',
  },
  orderedListDescription: {
    id: 'uidu.editor-core.orderedList.description',
    defaultMessage: 'Create an ordered list',
    description: '',
  },
  lists: {
    id: 'uidu.editor-core.lists',
    defaultMessage: 'Lists',
    description: 'Menu shows ordered/bullet list and unordered/numbered lists',
  },
});
