import { browser } from '@uidu/editor-common';
import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';
import {
  findParentDomRefOfType,
  findParentNodeOfType,
  findTable,
} from 'prosemirror-utils';
import { DecorationSet, EditorView } from 'prosemirror-view';
import { Dispatch } from '../../../event-dispatcher';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { pluginFactory } from '../../../utils/plugin-state-factory';
import {
  addBoldInEmptyHeaderCells,
  clearHoverSelection,
  setTableRef,
} from '../commands';
import {
  handleBlur,
  handleClick,
  handleCut,
  handleFocus,
  handleMouseDown,
  handleMouseLeave,
  handleMouseMove,
  handleMouseOut,
  handleMouseOver,
  handleTripleClick,
  whenTableInFocus,
} from '../event-handlers';
import { handleDocOrSelectionChanged } from '../handlers';
import { createTableView } from '../nodeviews/table';
import reducer from '../reducer';
import { fixTables } from '../transforms';
import { PluginConfig, TableCssClassName as ClassName } from '../types';
import { findControlsHoverDecoration, updateResizeHandles } from '../utils';

export const pluginKey = new PluginKey('tablePlugin');

export const defaultTableSelection = {
  hoveredColumns: [],
  hoveredRows: [],
  isInDanger: false,
};

let isBreakoutEnabled: boolean | undefined;
let isDynamicTextSizingEnabled: boolean | undefined;
let isFullWidthModeEnabled: boolean | undefined;
let wasFullWidthModeEnabled: boolean | undefined;

const { createPluginState, createCommand, getPluginState } = pluginFactory(
  pluginKey,
  reducer,
  {
    mapping: (tr, pluginState) => {
      if (tr.docChanged && pluginState.targetCellPosition) {
        const { pos, deleted } = tr.mapping.mapResult(
          pluginState.targetCellPosition,
        );
        return {
          ...pluginState,
          targetCellPosition: deleted ? undefined : pos,
        };
      }
      return pluginState;
    },
    onDocChanged: handleDocOrSelectionChanged,
    onSelectionChanged: handleDocOrSelectionChanged,
  },
);

export const createPlugin = (
  dispatch: Dispatch,
  portalProviderAPI: PortalProviderAPI,
  pluginConfig: PluginConfig,
  dynamicTextSizing?: boolean,
  breakoutEnabled?: boolean,
  fullWidthModeEnabled?: boolean,
  previousFullWidthModeEnabled?: boolean,
) => {
  isBreakoutEnabled = breakoutEnabled;
  isDynamicTextSizingEnabled = dynamicTextSizing;
  isFullWidthModeEnabled = fullWidthModeEnabled;
  wasFullWidthModeEnabled = previousFullWidthModeEnabled;

  const state = createPluginState(dispatch, {
    pluginConfig,
    insertColumnButtonIndex: undefined,
    insertRowButtonIndex: undefined,
    decorationSet: DecorationSet.empty,
    isFullWidthModeEnabled,
    isHeaderRowEnabled: !!pluginConfig.allowHeaderRow,
    isHeaderColumnEnabled: false,
    ...defaultTableSelection,
  });

  return new Plugin({
    state: state,
    key: pluginKey,
    appendTransaction: (
      transactions: Transaction[],
      oldState: EditorState,
      newState: EditorState,
    ) => {
      const tr = transactions.find(tr => tr.getMeta('uiEvent') === 'cut');
      if (tr) {
        // "fixTables" removes empty rows as we don't allow that in schema
        const updatedTr = handleCut(tr, oldState, newState);
        return fixTables(updatedTr) || updatedTr;
      }
      if (transactions.find(tr => tr.docChanged)) {
        return fixTables(newState.tr);
      }
      return undefined;
    },
    view: (editorView: EditorView) => {
      const domAtPos = editorView.domAtPos.bind(editorView);

      return {
        update: (view: EditorView) => {
          const { state, dispatch } = view;
          const { selection } = state;
          const pluginState = getPluginState(state);
          let tableRef;
          let tableNode;
          if (pluginState.editorHasFocus) {
            const parent = findParentDomRefOfType(
              state.schema.nodes.table,
              domAtPos,
            )(selection);
            if (parent) {
              tableRef = (parent as HTMLElement).querySelector('table');
            }

            tableNode = findTable(state.selection);
          }
          if (pluginState.tableRef !== tableRef) {
            setTableRef(tableRef)(state, dispatch);
          }

          if (pluginState.tableNode !== tableNode) {
            updateResizeHandles(tableRef);
          }

          if (pluginState.editorHasFocus && pluginState.tableRef) {
            const tableCellHeader = findParentNodeOfType(
              state.schema.nodes.tableHeader,
            )(state.selection);

            if (tableCellHeader) {
              addBoldInEmptyHeaderCells(tableCellHeader)(state, dispatch);
            }
          }
        },
      };
    },
    props: {
      decorations: state => getPluginState(state).decorationSet,

      handleClick: ({ state, dispatch }, _pos, event: MouseEvent) => {
        const { decorationSet } = getPluginState(state);
        if (findControlsHoverDecoration(decorationSet).length) {
          clearHoverSelection()(state, dispatch);
        }

        // ED-6069: workaround for Chrome given a regression introduced in prosemirror-view@1.6.8
        // Returning true prevents that updateSelection() is getting called in the commit below:
        // @see https://github.com/ProseMirror/prosemirror-view/commit/33fe4a8b01584f6b4103c279033dcd33e8047b95
        if (browser.chrome && event.target) {
          const targetClassList = (event.target as HTMLElement).classList;

          if (
            targetClassList.contains(ClassName.CONTROLS_BUTTON) ||
            targetClassList.contains(ClassName.CONTEXTUAL_MENU_BUTTON)
          ) {
            return true;
          }
        }

        return false;
      },

      nodeViews: {
        table: (node, view, getPos) =>
          createTableView(node, view, getPos, portalProviderAPI, {
            isBreakoutEnabled,
            dynamicTextSizing: isDynamicTextSizingEnabled,
            isFullWidthModeEnabled,
            wasFullWidthModeEnabled,
          }),
      },

      handleDOMEvents: {
        focus: handleFocus,
        blur: whenTableInFocus(handleBlur),
        mousedown: handleMouseDown,
        mouseover: whenTableInFocus(handleMouseOver),
        mouseleave: whenTableInFocus(handleMouseLeave),
        mouseout: whenTableInFocus(handleMouseOut),
        mousemove: whenTableInFocus(handleMouseMove),
        click: whenTableInFocus(handleClick),
      },

      handleTripleClick,
    },
  });
};

export { createCommand, getPluginState };
