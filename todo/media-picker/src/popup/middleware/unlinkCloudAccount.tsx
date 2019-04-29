import { Store, Dispatch } from 'redux';

import {
  REQUEST_UNLINK_CLOUD_ACCOUNT,
  RequestUnlinkCloudAccountAction,
  changeService,
  unlinkCloudAccount,
} from '../actions';
import { State } from '../domain';
import { Fetcher } from '../tools/fetcher/fetcher';

export default (fetcher: Fetcher) => (store: Store<State>) => (
  next: Dispatch<State>,
) => (action: RequestUnlinkCloudAccountAction) => {
  if (action.type === REQUEST_UNLINK_CLOUD_ACCOUNT) {
    const { userContext } = store.getState();

    userContext.config
      .authProvider()
      .then(auth => fetcher.unlinkCloudAccount(auth, action.account.id))
      .then(() => {
        store.dispatch(unlinkCloudAccount(action.account));
        store.dispatch(changeService(action.account.name));
      });
  }

  return next(action);
};
