import { Plugin, PluginKey, Transaction, EditorState } from 'prosemirror-state';
import { Dispatch } from '../../../event-dispatcher';
import { isAlignable } from '../commands';
import { getActiveAlignment } from '../utils';

export type AlignmentState = 'start' | 'end' | 'center';

export type AlignmentPluginState = {
  align: AlignmentState;
  isEnabled?: boolean;
};

export type ActionHandlerParams = {
  dispatch: Dispatch;
  pluginState: AlignmentPluginState;
  tr: Transaction;
  params?: {
    align?: string;
    disabled?: boolean;
  };
};

export function createInitialPluginState(
  editorState: EditorState,
  pluginConfig: AlignmentPluginState,
): AlignmentPluginState {
  return {
    align: getActiveAlignment(editorState) || pluginConfig.align,
    isEnabled: true,
  };
}

export const pluginKey = new PluginKey('alignmentPlugin');

export function createPlugin(
  dispatch: Dispatch,
  pluginConfig: AlignmentPluginState,
): Plugin {
  return new Plugin({
    key: pluginKey,
    state: {
      init(_config, editorState) {
        return createInitialPluginState(editorState, pluginConfig);
      },
      apply(_tr, state: AlignmentPluginState, _prevState, nextState) {
        const nextPluginState = getActiveAlignment(nextState);
        const isEnabled = isAlignable(nextPluginState)(
          nextState,
          /**
           * NOTE: Stan is already making dispatch optional in another PR.
           * We can remove this once it's merged.
           */
          undefined as any,
        );
        const newState = {
          ...state,
          align: nextPluginState,
          isEnabled,
        };
        if (nextPluginState !== state.align || isEnabled !== state.isEnabled) {
          dispatch(pluginKey, newState);
        }
        return newState;
      },
    },
  });
}
