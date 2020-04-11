import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
import { drawFakeTextCursor } from './cursor';

export const stateKey = new PluginKey('fakeTextCursorPlugin');

export const createPlugin = () =>
  new Plugin({
    key: stateKey,
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
