import {
  bodiedExtension,
  extension,
  inlineExtension,
} from '@uidu/adf-schema';
import { EditorPlugin } from '../../types';
import createPlugin from './plugin';
import { getToolbarConfig } from './toolbar';

interface ExtensionPluginOptions {
  breakoutEnabled?: boolean;
}

const extensionPlugin = (options?: ExtensionPluginOptions): EditorPlugin => ({
  name: 'extension',

  nodes() {
    return [
      { name: 'extension', node: extension },
      { name: 'bodiedExtension', node: bodiedExtension },
      { name: 'inlineExtension', node: inlineExtension },
    ];
  },

  pmPlugins() {
    return [
      {
        name: 'extension',
        plugin: ({ props, dispatch, providerFactory, portalProviderAPI }) => {
          let allowBreakout =
            (typeof props.allowExtension === 'object'
              ? props.allowExtension
              : { allowBreakout: false }
            ).allowBreakout &&
            options &&
            options.breakoutEnabled;

          return createPlugin(
            dispatch,
            providerFactory,
            props.extensionHandlers || {},
            portalProviderAPI,
            typeof props.allowExtension === 'object'
              ? { ...props.allowExtension, allowBreakout }
              : props.allowExtension,
          );
        },
      },
    ];
  },

  pluginsOptions: {
    floatingToolbar: getToolbarConfig(options && options.breakoutEnabled),
  },
});

export default extensionPlugin;
