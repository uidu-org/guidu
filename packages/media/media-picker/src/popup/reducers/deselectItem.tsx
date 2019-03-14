import { Action } from 'redux';

import { isDeslectItemAction } from '../actions';
import { State } from '../domain';

export default function deselectItem<A extends Action>(
  state: State,
  action: A,
): State {
  if (isDeslectItemAction(action)) {
    const { selectedItems } = state;
    if (selectedItems) {
      return {
        ...state,
        selectedItems: selectedItems.filter(item => item.id !== action.id),
      };
    }
  }

  return state;
}
