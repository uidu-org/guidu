import { indentation } from '@uidu/adf-schema';
import { EditorPlugin } from '../../types';
import { keymapPlugin } from './pm-plugins/keymap';

const indentationPlugin = (): EditorPlugin => ({
  name: 'indentation',

  marks() {
    return [{ name: 'indentation', mark: indentation }];
  },

  pmPlugins() {
    return [
      {
        name: 'indentationKeymap',
        plugin: () => keymapPlugin(),
      },
    ];
  },
});

export default indentationPlugin;
