import { panel, PanelType } from '@uidu/adf-schema';
import { EditorState } from 'prosemirror-state';
import React from 'react';
import { EditorPlugin } from '../../types';
import { PANEL_TYPE } from '../analytics';
import { messages } from '../block-type/messages';
import {
  IconPanel,
  IconPanelError,
  IconPanelNote,
  IconPanelSuccess,
  IconPanelWarning,
} from '../quick-insert/assets';
import keymap from './pm-plugins/keymaps';
import { createPlugin } from './pm-plugins/main';
import { getToolbarConfig } from './toolbar';

const insertPanelType = (panelType: PanelType, state: EditorState) =>
  state.schema.nodes.panel.createChecked(
    { panelType },
    state.schema.nodes.paragraph.createChecked(),
  );

const panelPlugin = (): EditorPlugin => ({
  name: 'panel',

  nodes() {
    return [{ name: 'panel', node: panel }];
  },

  pmPlugins() {
    return [
      { name: 'panel', plugin: createPlugin },
      {
        name: 'panelKeyMap',
        plugin: () => keymap(),
      },
    ];
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(messages.infoPanel),
        description: formatMessage(messages.infoPanelDescription),
        keywords: ['info', 'panel'],
        priority: 900,
        icon: () => <IconPanel label={formatMessage(messages.infoPanel)} />,
        action(insert, state) {
          return insert(insertPanelType(PANEL_TYPE.INFO, state));
        },
      },
      {
        title: formatMessage(messages.notePanel),
        description: formatMessage(messages.notePanelDescription),
        keywords: ['note'],
        priority: 1000,
        icon: () => <IconPanelNote label={formatMessage(messages.notePanel)} />,
        action(insert, state) {
          return insert(insertPanelType(PANEL_TYPE.NOTE, state));
        },
      },
      {
        title: formatMessage(messages.successPanel),
        description: formatMessage(messages.successPanelDescription),
        keywords: ['success', 'tip'],
        priority: 1000,
        icon: () => (
          <IconPanelSuccess label={formatMessage(messages.successPanel)} />
        ),
        action(insert, state) {
          return insert(insertPanelType(PANEL_TYPE.SUCCESS, state));
        },
      },
      {
        title: formatMessage(messages.warningPanel),
        description: formatMessage(messages.warningPanelDescription),
        keywords: ['warning'],
        priority: 1000,
        icon: () => (
          <IconPanelWarning label={formatMessage(messages.warningPanel)} />
        ),
        action(insert, state) {
          return insert(insertPanelType(PANEL_TYPE.WARNING, state));
        },
      },
      {
        title: formatMessage(messages.errorPanel),
        description: formatMessage(messages.errorPanelDescription),
        keywords: ['error'],
        priority: 1000,
        icon: () => (
          <IconPanelError label={formatMessage(messages.errorPanel)} />
        ),
        action(insert, state) {
          return insert(insertPanelType(PANEL_TYPE.ERROR, state));
        },
      },
    ],
    floatingToolbar: getToolbarConfig,
  },
});

export default panelPlugin;
