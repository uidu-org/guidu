import { video } from '@uidu/adf-schema';
import { ModalTransition } from '@uidu/modal-dialog';
import React from 'react';
import { EditorPlugin } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../analytics';
import {
  EditorDisabledPluginState,
  pluginKey as editorDisabledPluginKey,
} from '../editor-disabled';
import { messages } from '../insert-block/ui/ToolbarInsertBlock/messages';
import { IconVideo } from '../quick-insert/assets';
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
        icon: () => <IconVideo label={formatMessage(messages.video)} />,
        action: (insert, state) => {
          const tr = insert('');
          addAnalytics(state, tr, {
            action: ACTION.INSERTED,
            actionSubject: ACTION_SUBJECT.DOCUMENT,
            actionSubjectId: ACTION_SUBJECT_ID.DATE,
            eventType: EVENT_TYPE.TRACK,
            attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
          });
          return tr.setMeta(videoPluginKey, {
            showVideoPickerAt: tr.selection.from,
          });
        },
      },
    ],
  },
});

export default videoPlugin;
