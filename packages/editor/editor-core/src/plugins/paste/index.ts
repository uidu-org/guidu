import { EditorPlugin } from '../../types';
import { CardOptions } from '../card';
import { createPlugin } from './pm-plugins/main';

const pastePlugin = ({
  cardOptions,
  sanitizePrivateContent,
}: {
  cardOptions?: CardOptions;
  sanitizePrivateContent?: boolean;
}): EditorPlugin => ({
  name: 'paste',

  pmPlugins() {
    return [
      {
        name: 'paste',
        plugin: ({ schema }) =>
          createPlugin(schema, cardOptions, sanitizePrivateContent),
      },
    ];
  },
});

export default pastePlugin;
