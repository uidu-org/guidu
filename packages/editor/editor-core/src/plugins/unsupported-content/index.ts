import {
  unsupportedBlock,
  unsupportedInline,
  unsupportedMark,
  unsupportedNodeAttribute,
} from '@uidu/adf-schema';
import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
import { ReactNodeView } from '../../nodeviews';
import { EditorPlugin, PMPluginFactory } from '../../types';
import ReactUnsupportedBlockNode from './nodeviews/unsupported-block';
import ReactUnsupportedInlineNode from './nodeviews/unsupported-inline';
import { traverseNode } from './utils';

export const pluginKey = new PluginKey('unsupportedContentPlugin');

const createPlugin: PMPluginFactory = ({ schema, portalProviderAPI }) => {
  return new Plugin({
    state: {
      init(_config, state: EditorState) {
        traverseNode(state.doc, schema);
      },
      apply(_tr, pluginState) {
        return pluginState;
      },
    },
    key: pluginKey,
    props: {
      nodeViews: {
        unsupportedBlock: ReactNodeView.fromComponent(
          ReactUnsupportedBlockNode,
          portalProviderAPI,
        ),
        unsupportedInline: ReactNodeView.fromComponent(
          ReactUnsupportedInlineNode,
          portalProviderAPI,
        ),
      },
    },
  });
};

const unsupportedContentPlugin = (): EditorPlugin => ({
  name: 'unsupportedContent',

  marks() {
    return [
      { name: 'unsupportedMark', mark: unsupportedMark },
      { name: 'unsupportedNodeAttribute', mark: unsupportedNodeAttribute },
    ];
  },

  nodes() {
    return [
      {
        name: 'unsupportedBlock',
        node: unsupportedBlock,
      },
      {
        name: 'unsupportedInline',
        node: unsupportedInline,
      },
    ];
  },

  pmPlugins() {
    return [
      {
        name: 'unsupportedContent',
        plugin: createPlugin,
      },
    ];
  },
});

export default unsupportedContentPlugin;
