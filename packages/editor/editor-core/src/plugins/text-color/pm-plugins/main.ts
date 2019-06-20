import { Plugin, PluginKey, Transaction, EditorState } from 'prosemirror-state';

import { colorPalette, borderColorPalette } from '@atlaskit/adf-schema';
import { colors } from '@atlaskit/theme';

import { Dispatch } from '../../../event-dispatcher';
import { getActiveColor } from '../utils/color';
import { getDisabledState } from '../utils/disabled';

export type TextColorPluginState = {
  palette: Map<string, string>;
  borderColorPalette: {
    [name: string]: string;
  };
  defaultColor: string;
  disabled?: boolean;
  color: string | null;
};

export type ActionHandlerParams = {
  dispatch: Dispatch;
  pluginState: TextColorPluginState;
  tr: Transaction;
  params?: {
    color?: string;
    disabled?: boolean;
  };
};

export type TextColorDefaultColor = {
  color: string;
  label: string;
};

export interface TextColorPluginConfig {
  defaultColor: TextColorDefaultColor;
}

export const DEFAULT_COLOR = {
  color: colors.N800.toLowerCase(),
  label: 'Dark gray',
};

export function createInitialPluginState(
  editorState: EditorState,
  pluginConfig?: TextColorPluginConfig,
): TextColorPluginState {
  const defaultColor =
    (pluginConfig && pluginConfig.defaultColor) || DEFAULT_COLOR;

  const palette = new Map<string, string>([
    [defaultColor.color, defaultColor.label],
  ]);

  // Typescript can't spread Map as of 11 May, 2017
  colorPalette.forEach((label, color) => palette.set(color, label));

  return {
    color: getActiveColor(editorState),
    disabled: getDisabledState(editorState),
    palette,
    borderColorPalette,
    defaultColor: palette.keys().next().value,
  };
}

export enum ACTIONS {
  RESET_COLOR,
  SET_COLOR,
  DISABLE,
}

export const pluginKey = new PluginKey('textColorPlugin');

export function createPlugin(
  dispatch: Dispatch,
  pluginConfig?: TextColorPluginConfig,
): Plugin {
  return new Plugin({
    key: pluginKey,
    state: {
      init(_config, editorState) {
        return createInitialPluginState(editorState, pluginConfig);
      },
      apply(tr, pluginState, _, newState) {
        const meta = tr.getMeta(pluginKey) || {};

        let nextState;
        switch (meta.action) {
          case ACTIONS.RESET_COLOR:
            nextState = { ...pluginState, color: pluginState.defaultColor };
            break;

          case ACTIONS.SET_COLOR:
            nextState = { ...pluginState, color: meta.color, disabled: false };
            break;

          case ACTIONS.DISABLE:
            nextState = { ...pluginState, disabled: true };
            break;

          default:
            nextState = {
              ...pluginState,
              color: getActiveColor(newState),
              disabled: getDisabledState(newState),
            };
        }

        if (
          (pluginState && pluginState.color !== nextState.color) ||
          (pluginState && pluginState.disabled !== nextState.disabled)
        ) {
          dispatch(pluginKey, nextState);
          return nextState;
        }

        return pluginState;
      },
    },
  });
}
