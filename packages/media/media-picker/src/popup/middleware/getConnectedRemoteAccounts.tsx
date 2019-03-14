import { Action, Store, Dispatch } from 'redux';

import { updateServiceList } from '../actions';
import { Fetcher } from '../tools/fetcher/fetcher';
import { State } from '../domain';
import {
  GET_CONNECTED_REMOTE_ACCOUNTS,
  GetConnectedRemoteAccountsAction,
} from '../actions/getConnectedRemoteAccounts';

const isGetConnectedRemoteAccountsAction = (
  action: Action,
): action is GetConnectedRemoteAccountsAction => {
  return action.type === GET_CONNECTED_REMOTE_ACCOUNTS;
};

export const getConnectedRemoteAccounts = (fetcher: Fetcher) => (
  store: Store<State>,
) => (next: Dispatch<Action>) => (action: Action) => {
  if (isGetConnectedRemoteAccountsAction(action)) {
    const { userContext } = store.getState();

    store.dispatch(
      updateServiceList(
        userContext.config
          .authProvider()
          .then(auth => fetcher.getServiceList(auth)),
      ),
    );
  }

  return next(action);
};
