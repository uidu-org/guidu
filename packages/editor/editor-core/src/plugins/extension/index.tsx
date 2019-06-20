import {
  inlineExtension,
  extension,
  bodiedExtension,
} from '@atlaskit/adf-schema';
import { EditorPlugin } from '../../types';
import createPlugin from './plugin';
import { getToolbarConfig } from './toolbar';

const extensionPlugin: EditorPlugin = {
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
            ).allowBreakout && props.appearance !== 'full-width';

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
    floatingToolbar: getToolbarConfig,
  },
};

export default extensionPlugin;
