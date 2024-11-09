import { textColor } from '@uidu/adf-schema';
import React from 'react';
import { EditorPlugin } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import type {
  TextColorPluginConfig,
  TextColorPluginState,
} from './pm-plugins/main';
import {
  createPlugin,
  pluginKey as textColorPluginKey,
} from './pm-plugins/main';
import ToolbarTextColor from './ui/ToolbarTextColor';

const pluginConfig = (
  textColorConfig?: TextColorPluginConfig | boolean,
): TextColorPluginConfig | undefined => {
  if (!textColorConfig || typeof textColorConfig === 'boolean') {
    return undefined;
  }

  return textColorConfig;
};

const textColorPlugin = (
  textColorConfig?: TextColorPluginConfig | boolean,
): EditorPlugin => ({
  name: 'textColor',

  marks() {
    return [{ name: 'textColor', mark: textColor }];
  },

  pmPlugins() {
    return [
      {
        name: 'textColor',
        plugin: ({ dispatch }) =>
          createPlugin(dispatch, pluginConfig(textColorConfig)),
      },
    ];
  },

  primaryToolbarComponent({ editorView, isToolbarReducedSpacing, disabled }) {
    const config = pluginConfig(textColorConfig);
    const showMoreColorsToggle =
      config && config.EXPERIMENTAL_allowMoreTextColors;

    return (
      <WithPluginState
        plugins={{
          textColor: textColorPluginKey,
        }}
        render={({ textColor }) => (
          <ToolbarTextColor
            pluginState={textColor}
            isReducedSpacing={isToolbarReducedSpacing}
            editorView={editorView}
            showMoreColorsToggle={showMoreColorsToggle}
            disabled={disabled}
          />
        )}
      />
    );
  },
});

export { textColorPluginKey };
export type { TextColorPluginState };

export default textColorPlugin;
