import { alignment } from '@atlaskit/adf-schema';
import * as React from 'react';
import WithPluginState from '../../components/WithPluginState';
import { EditorPlugin } from '../../types';
import { changeAlignment } from './commands';
import {
  AlignmentPluginState,
  AlignmentState,
  createPlugin,
  pluginKey,
} from './pm-plugins/main';
import ToolbarAlignment from './ui/ToolbarAlignment';

export const defaultConfig: AlignmentPluginState = {
  align: 'start',
};

const alignmentPlugin = (): EditorPlugin => ({
  name: 'alignmentPlugin',

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
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    disabled,
    isToolbarReducedSpacing,
  }) {
    return (
      <WithPluginState
        plugins={{
          align: pluginKey,
        }}
        render={({ align }) => {
          return (
            <ToolbarAlignment
              pluginState={align}
              isReducedSpacing={isToolbarReducedSpacing}
              changeAlignment={(align: AlignmentState) =>
                changeAlignment(align)(editorView.state, editorView.dispatch)
              }
              disabled={disabled || !align.isEnabled}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
              popupsScrollableElement={popupsScrollableElement}
            />
          );
        }}
      />
    );
  },
});

export default alignmentPlugin;
