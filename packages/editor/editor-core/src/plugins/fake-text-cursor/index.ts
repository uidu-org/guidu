import { SafePlugin } from '@uidu/editor-common/safe-plugin';
import { PluginKey } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
import { drawFakeTextCursor } from './cursor';

export const fakeCursorForToolbarPluginKey = new PluginKey(
  'fakeTextCursorPlugin',
);

export const createPlugin = () =>
  new SafePlugin({
    key: fakeCursorForToolbarPluginKey,
    props: {
      decorations: drawFakeTextCursor,
    },
  });

const fakeTextCursorPlugin = (): EditorPlugin => ({
  name: 'fakeTextCursor',

  pmPlugins() {
    return [{ name: 'fakeTextCursor', plugin: () => createPlugin() }];
  },
});

export default fakeTextCursorPlugin;
