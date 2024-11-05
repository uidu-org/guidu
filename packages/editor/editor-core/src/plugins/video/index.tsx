import { faVideo } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { video } from '@uidu/adf-schema';
import { ModalTransition } from '@uidu/modal-dialog';
import React from 'react';
import { EditorPlugin } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import {
  EditorDisabledPluginState,
  pluginKey as editorDisabledPluginKey,
} from '../editor-disabled';
import { messages } from '../insert-block/ui/ToolbarInsertBlock/messages';
import keymap from './pm-plugins/keymap';
import createPlugin from './pm-plugins/main';
import { pluginKey as videoPluginKey } from './pm-plugins/plugin-key';
import { VideoState } from './pm-plugins/types';
import VideoPicker from './ui/VideoPicker';

const videoPlugin = (): EditorPlugin => ({
  name: 'video',

  nodes() {
    return [{ name: 'video', node: video }];
  },

  pmPlugins() {
    return [
      {
        name: 'video',
        plugin: (options) => {
          // VideoPicker.preload();
          return createPlugin(options);
        },
      },
      {
        name: 'videoKeymap',
        plugin: () => {
          // VideoPicker.preload();
          return keymap();
        },
      },
    ];
  },

  contentComponent({ editorView }) {
    const { dispatch } = editorView;
    return (
      <WithPluginState
        plugins={{
          videoPlugin: videoPluginKey,
          editorDisabledPlugin: editorDisabledPluginKey,
        }}
        render={({
          editorDisabledPlugin,
          videoPlugin,
        }: {
          editorDisabledPlugin: EditorDisabledPluginState;
          videoPlugin: VideoState;
        }) => {
          const showVideoPickerAt =
            videoPlugin && videoPlugin.showVideoPickerAt;
          if (
            !showVideoPickerAt ||
            (editorDisabledPlugin || {}).editorDisabled
          ) {
            return null;
          }

          return (
            <ModalTransition>
              {showVideoPickerAt && <VideoPicker editorView={editorView} />}
            </ModalTransition>
          );
        }}
      />
    );
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(messages.video),
        description: formatMessage(messages.videoDescription),
        priority: 800,
        keywords: ['video', 'youtube', '/'],
        keyshortcut: '//',
        icon: () => (
          <FontAwesomeIcon
            icon={faVideo}
            label={formatMessage(messages.video)}
          />
        ),
        action: (insert, state) => {
          const tr = insert('');
          return tr.setMeta(videoPluginKey, {
            showVideoPickerAt: tr.selection.from,
          });
        },
      },
    ],
  },
});

export default videoPlugin;
