import { table, tableCell, tableHeader, tableRow } from '@atlaskit/adf-schema';
import { tableEditing } from 'prosemirror-tables';
import { createTable } from 'prosemirror-utils';
import * as React from 'react';
import WithPluginState from '../../components/WithPluginState';
import { toggleTable, tooltip } from '../../keymaps';
import { EditorPlugin } from '../../types';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../analytics';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import { IconTable } from '../quick-insert/assets';
import { keymapPlugin } from './pm-plugins/keymap';
import { createPlugin, pluginKey } from './pm-plugins/main';
import {
  createPlugin as createFlexiResizingPlugin,
  pluginKey as tableResizingPluginKey,
} from './pm-plugins/table-resizing';
import { getToolbarConfig } from './toolbar';
import {
  ColumnResizingPluginState,
  PermittedLayoutsDescriptor,
  PluginConfig,
} from './types';
import FloatingContextualButton from './ui/FloatingContextualButton';
import FloatingContextualMenu from './ui/FloatingContextualMenu';
import LayoutButton from './ui/LayoutButton';
import { isLayoutSupported } from './utils';

export const pluginConfig = (tablesConfig?: PluginConfig | boolean) => {
  const config =
    !tablesConfig || typeof tablesConfig === 'boolean' ? {} : tablesConfig;
  return config.advanced
    ? {
        allowBackgroundColor: true,
        allowColumnResizing: true,
        allowHeaderColumn: true,
        allowHeaderRow: true,
        allowMergeCells: true,
        allowNumberColumn: true,
        stickToolbarToBottom: true,
        permittedLayouts: 'all' as PermittedLayoutsDescriptor,
        allowControls: true,
        ...config,
      }
    : config;
};

const tablesPlugin = (disableBreakoutUI?: boolean): EditorPlugin => ({
  nodes() {
    return [
      { name: 'table', node: table },
      { name: 'tableHeader', node: tableHeader },
      { name: 'tableRow', node: tableRow },
      { name: 'tableCell', node: tableCell },
    ];
  },

  pmPlugins() {
    return [
      {
        name: 'table',
        plugin: ({ props, prevProps, dispatch, portalProviderAPI }) => {
          const { allowTables, appearance, allowDynamicTextSizing } = props;
          const isBreakoutEnabled = appearance === 'full-page';
          const isFullWidthModeEnabled = appearance === 'full-width';
          const wasFullWidthModeEnabled =
            prevProps && prevProps.appearance === 'full-width';
          return createPlugin(
            dispatch,
            portalProviderAPI,
            pluginConfig(allowTables),
            isBreakoutEnabled && allowDynamicTextSizing,
            isBreakoutEnabled,
            isFullWidthModeEnabled,
            wasFullWidthModeEnabled,
          );
        },
      },
      {
        name: 'tablePMColResizing',
        plugin: ({
          dispatch,
          props: { appearance, allowTables, allowDynamicTextSizing },
        }) => {
          const { allowColumnResizing } = pluginConfig(allowTables);
          return allowColumnResizing
            ? createFlexiResizingPlugin(dispatch, {
                dynamicTextSizing:
                  allowDynamicTextSizing && appearance !== 'full-width',
                lastColumnResizable: appearance !== 'full-width',
              } as ColumnResizingPluginState)
            : undefined;
        },
      },
      // Needs to be lower priority than prosemirror-tables.tableEditing
      // plugin as it is currently swallowing backspace events inside tables
      { name: 'tableKeymap', plugin: () => keymapPlugin() },
      { name: 'tableEditing', plugin: () => tableEditing() },
    ];
  },

  contentComponent({
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    appearance,
  }) {
    return (
      <WithPluginState
        plugins={{
          pluginState: pluginKey,
          tableResizingPluginState: tableResizingPluginKey,
        }}
        render={_ => {
          const { state } = editorView;
          const pluginState = pluginKey.getState(state);
          const tableResizingPluginState = tableResizingPluginKey.getState(
            state,
          );
          const isDragging =
            tableResizingPluginState && tableResizingPluginState.dragging;
          const isMobile = appearance === 'mobile';
          return (
            <>
              {pluginState.targetCellPosition && !isDragging && !isMobile && (
                <FloatingContextualButton
                  editorView={editorView}
                  mountPoint={popupsMountPoint}
                  targetCellPosition={pluginState.targetCellPosition}
                  scrollableElement={popupsScrollableElement}
                  isContextualMenuOpen={pluginState.isContextualMenuOpen}
                />
              )}
              <FloatingContextualMenu
                editorView={editorView}
                mountPoint={popupsMountPoint}
                boundariesElement={popupsBoundariesElement}
                targetCellPosition={pluginState.targetCellPosition}
                isOpen={pluginState.isContextualMenuOpen}
                pluginConfig={pluginState.pluginConfig}
              />
              {appearance === 'full-page' &&
                isLayoutSupported(state) &&
                !disableBreakoutUI && (
                  <LayoutButton
                    editorView={editorView}
                    mountPoint={popupsMountPoint}
                    boundariesElement={popupsBoundariesElement}
                    scrollableElement={popupsScrollableElement}
                    targetRef={pluginState.tableWrapperTarget!}
                    isResizing={
                      !!tableResizingPluginState &&
                      !!tableResizingPluginState.dragging
                    }
                  />
                )}
            </>
          );
        }}
      />
    );
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(messages.table),
        description: formatMessage(messages.tableDescription),
        priority: 600,
        keyshortcut: tooltip(toggleTable),
        icon: () => <IconTable label={formatMessage(messages.table)} />,
        action(insert, state) {
          const tr = insert(createTable(state.schema));
          return addAnalytics(tr, {
            action: ACTION.INSERTED,
            actionSubject: ACTION_SUBJECT.DOCUMENT,
            actionSubjectId: ACTION_SUBJECT_ID.TABLE,
            attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
            eventType: EVENT_TYPE.TRACK,
          });
        },
      },
    ],
    floatingToolbar: getToolbarConfig,
  },
});

export default tablesPlugin;
