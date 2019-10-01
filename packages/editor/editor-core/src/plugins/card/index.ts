import { blockCard, inlineCard } from '@uidu/adf-schema';
import { PluginKey } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
import { createPlugin } from './pm-plugins/main';
import { floatingToolbar } from './toolbar';

export { CardOptions, CardProvider } from './types';

export const stateKey = new PluginKey('cardPlugin');

const cardPlugin = (): EditorPlugin => ({
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
    floatingToolbar,
  },
});

export default cardPlugin;
