import { alignment } from '@uidu/adf-schema';
import React from 'react';
import { EditorPlugin } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import { changeAlignment } from './commands';
import { createPlugin, pluginKey } from './pm-plugins/main';
import { AlignmentPluginState, AlignmentState } from './types';
import ToolbarAlignment from './ui/ToolbarAlignment';

export const defaultConfig: AlignmentPluginState = {
  align: 'start',
};

const alignmentPlugin = (): EditorPlugin => ({
  name: 'alignment',

  marks() {
    return [{ name: 'alignment', mark: alignment }];
  },

  pmPlugins() {
    return [
      {
        name: 'alignmentPlugin',
        plugin: ({ dispatch }) => createPlugin(dispatch, defaultConfig),
      },
    ];
  },

  primaryToolbarComponent({
    editorView,
    // popupsMountPoint,
    // popupsBoundariesElement,
    // popupsScrollableElement,
    disabled,
  }) {
    return (
      <WithPluginState
        plugins={{
          align: pluginKey,
        }}
        render={({ align }: { align: AlignmentPluginState }) => (
          <ToolbarAlignment
            pluginState={align}
            changeAlignment={(a: AlignmentState) =>
              changeAlignment(a)(editorView.state, editorView.dispatch)
            }
            disabled={disabled || !align.isEnabled}
            // popupsMountPoint={popupsMountPoint}
            // popupsBoundariesElement={popupsBoundariesElement}
            // popupsScrollableElement={popupsScrollableElement}
          />
        )}
      />
    );
  },
});

export default alignmentPlugin;
