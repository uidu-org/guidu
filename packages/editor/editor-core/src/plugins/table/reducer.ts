import { TablePluginState, TablePluginAction } from './types';
import { defaultTableSelection } from './pm-plugins/main';

export default (
  pluginState: TablePluginState,
  action: TablePluginAction,
): TablePluginState => {
  switch (action.type) {
    case 'TOGGLE_HEADER_COLUMN':
      return {
        ...pluginState,
        isHeaderColumnEnabled: pluginState.isHeaderColumnEnabled,
      };

    case 'TOGGLE_HEADER_ROW':
      return {
        ...pluginState,
        isHeaderRowEnabled: pluginState.isHeaderRowEnabled,
      };

    case 'CLEAR_HOVER_SELECTION':
      return { ...pluginState, ...action.data, ...defaultTableSelection };

    case 'SET_TARGET_CELL_POSITION':
      return { ...pluginState, ...action.data, isContextualMenuOpen: false };

    case 'TOGGLE_CONTEXTUAL_MENU':
      return {
        ...pluginState,
        isContextualMenuOpen: !pluginState.isContextualMenuOpen,
      };

    case 'SHOW_INSERT_ROW_BUTTON':
      if (
        action.data.insertRowButtonIndex === pluginState.insertRowButtonIndex
      ) {
        return pluginState;
      }
      return { ...pluginState, ...action.data };

    case 'SHOW_INSERT_COLUMN_BUTTON':
      if (
        action.data.insertColumnButtonIndex ===
        pluginState.insertColumnButtonIndex
      ) {
        return pluginState;
      }
      return { ...pluginState, ...action.data };

    case 'HIDE_INSERT_COLUMN_OR_ROW_BUTTON':
      if (
        pluginState.insertRowButtonIndex !== undefined ||
        pluginState.insertColumnButtonIndex !== undefined
      ) {
        return {
          ...pluginState,
          insertRowButtonIndex: undefined,
          insertColumnButtonIndex: undefined,
        };
      }
      return pluginState;

    case 'SET_TABLE_REF':
    case 'HOVER_ROWS':
    case 'HOVER_COLUMNS':
    case 'HOVER_TABLE':
    case 'SET_EDITOR_FOCUS':
      return { ...pluginState, ...action.data };
    default:
      return pluginState;
  }
};
