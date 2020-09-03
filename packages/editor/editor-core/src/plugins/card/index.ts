import { blockCard, inlineCard } from '@uidu/adf-schema';
import { PluginKey } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
import { createPlugin } from './pm-plugins/main';
import { floatingToolbar } from './toolbar';
import { CardOptions } from './types';

export type { CardOptions } from './types';

export const stateKey = new PluginKey('cardPlugin');

const cardPlugin = (options: CardOptions): EditorPlugin => ({
  name: 'card',

  nodes() {
    return [
      { name: 'inlineCard', node: inlineCard },
      { name: 'blockCard', node: blockCard },
    ];
  },

  pmPlugins() {
    return [{ name: 'card', plugin: createPlugin }];
  },

  pluginsOptions: {
    floatingToolbar: floatingToolbar(options),
  },
});

export default cardPlugin;
