import { Store, Dispatch } from 'redux';

import { updateServiceList, START_AUTH, StartAuthAction } from '../actions';
import { changeAccount } from '../actions/changeAccount';
import { State, ServiceAccountWithType } from '../domain';
import { Fetcher } from '../tools/fetcher/fetcher';
import { CloudService } from '../services/cloud-service';

export const startCloudAccountOAuthFlow = (
  fetcher: Fetcher,
  cloudService: CloudService,
) => (store: Store<State>) => (next: Dispatch<State>) => (
  action: StartAuthAction,
) => {
  if (action.type === START_AUTH) {
    const { redirectUrl, userContext } = store.getState();
    const { serviceName } = action;

    const accounts = cloudService
      .startAuth(redirectUrl, serviceName)
      .then(() => userContext.config.authProvider())
      .then(auth => fetcher.getServiceList(auth));

    store.dispatch(updateServiceList(accounts));

    accounts.then((accounts: ServiceAccountWithType[]) => {
      const selectedAccount = accounts.find(
        account => account.type === serviceName,
      );
      if (selectedAccount) {
        store.dispatch(changeAccount(serviceName, selectedAccount.id));
      }
    });
  }

  return next(action);
};
