import { Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { Dispatch } from '../../event-dispatcher';
import { EditorPlugin } from '../../types';

export const pluginKey = new PluginKey('maxContentSizePlugin');

export type MaxContentSizePluginState = { maxContentSizeReached: boolean };

export function createPlugin(
  dispatch: Dispatch,
  maxContentSize?: number,
): Plugin | undefined {
  if (!maxContentSize) {
    return undefined;
  }

  let maxContentSizeReached = false;

  return new Plugin({
    filterTransaction(tr: Transaction): boolean {
      const result = tr.doc && tr.doc.nodeSize > maxContentSize;

      if (result || result !== maxContentSizeReached) {
        dispatch(pluginKey, { maxContentSizeReached: result });
      }

      maxContentSizeReached = result;
      return !result;
    },
  });
}

const maxContentSizePlugin = (): EditorPlugin => ({
  name: 'maxContentSize',

  pmPlugins() {
    return [
      {
        name: 'maxContentSize',
        plugin: ({ dispatch, props }) =>
          createPlugin(dispatch, props.maxContentSize),
      },
    ];
  },
});

export default maxContentSizePlugin;
