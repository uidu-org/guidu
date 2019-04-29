import { UPDATE_SERVICE_LIST, UpdateServiceListAction } from '../actions';
import { State } from '../domain';

export default function serviceListUpdate(
  state: State,
  action: UpdateServiceListAction,
): State {
  if (action.type === UPDATE_SERVICE_LIST) {
    return {
      ...state,
      accounts: action.accounts,
    };
  } else {
    return state;
  }
}
