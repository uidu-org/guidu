import { Command } from '../../../types';
import { pluginKey, ACTIONS } from '../pm-plugins/main';
import { TypeAheadItem } from '../types';

export const itemsListUpdated = (items: Array<TypeAheadItem>): Command => (
  state,
  dispatch,
) => {
  if (dispatch) {
    dispatch(
      state.tr.setMeta(pluginKey, {
        action: ACTIONS.ITEMS_LIST_UPDATED,
        items,
      }),
    );
  }
  return true;
};
