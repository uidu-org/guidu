import { EditorPlugin } from '../../types';
import { createPlugin } from './pm-plugins/main';

const pastePlugin = (): EditorPlugin => ({
  name: 'paste',

  pmPlugins() {
    return [
      {
        name: 'paste',
        plugin: ({ schema, props }) =>
          createPlugin(
            schema,
            props.UNSAFE_cards,
            props.sanitizePrivateContent,
          ),
      },
    ];
  },
});

export default pastePlugin;
