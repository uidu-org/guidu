import { collab } from 'prosemirror-collab';
import { EditorPlugin } from '../../types';
import { createPlugin, pluginKey } from './plugin';
import { CollabEditOptions } from './types';
export { CollabProvider } from './provider';
export type { CollabEditProvider } from './provider';
export { pluginKey };
export type { CollabEditOptions };

const collabEditPlugin = (
  options?: CollabEditOptions,
  sanitizePrivateContent?: boolean,
): EditorPlugin => ({
  name: 'collabEdit',

  pmPlugins() {
    const { useNativePlugin = false, userId = null } = options || {};

    return [
      ...(useNativePlugin
        ? [
            {
              name: 'pmCollab',
              plugin: () => collab({ clientID: userId }),
            },
          ]
        : []),
      {
        name: 'collab',
        plugin: ({ dispatch, providerFactory }) =>
          createPlugin(
            dispatch,
            providerFactory,
            options,
            sanitizePrivateContent,
          ),
      },
    ];
  },
});

export default collabEditPlugin;
