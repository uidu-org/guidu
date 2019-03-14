import { Action, Store, Dispatch } from 'redux';

import {
  requestUnlinkCloudAccount,
  isChangeCloudAccountFolderAction,
} from '../actions';
import { fileListUpdate } from '../actions/fileListUpdate';
import { Fetcher } from '../tools/fetcher/fetcher';
import { State } from '../domain';

export const changeCloudAccountFolderMiddleware = (fetcher: Fetcher) => (
  store: Store<State>,
) => (next: Dispatch<State>) => (action: Action) => {
  if (isChangeCloudAccountFolderAction(action)) {
    const { userContext } = store.getState();
    const { serviceName, accountId, path } = action;
    const lastPath =
      path.length === 0 ? { id: '', name: '' } : path[path.length - 1];

    userContext.config
      .authProvider()
      .then(auth =>
        fetcher.fetchCloudAccountFolder(
          auth,
          serviceName,
          accountId,
          lastPath.id,
        ),
      )
      .then(folder =>
        store.dispatch(
          fileListUpdate(
            accountId,
            path,
            folder.items,
            serviceName,
            undefined,
            folder.cursor,
          ),
        ),
      )
      .catch(error => {
        /* TODO: Error Collector */
        if (error.response && error.response.status === 401) {
          store.dispatch(
            requestUnlinkCloudAccount({ id: accountId, name: serviceName }),
          );
        }
      });
  }

  return next(action);
};
