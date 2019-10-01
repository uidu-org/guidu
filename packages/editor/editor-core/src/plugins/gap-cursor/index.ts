import { EditorPlugin } from '../../types';
import keymapPlugin from './pm-plugins/keymap';
import plugin from './pm-plugins/main';

export { setCursorForTopLevelBlocks } from './actions';
export { GapCursorSelection, Side } from './selection';

const gapCursorPlugin = (): EditorPlugin => ({
  name: 'gapCursor',

  pmPlugins() {
    return [
      {
        name: 'gapCursorKeymap',
        plugin: () => keymapPlugin(),
      },
      {
        name: 'gapCursor',
        plugin: () => plugin,
      },
    ];
  },
});

export default gapCursorPlugin;
