import { Action } from 'redux';

export const GET_CONNECTED_REMOTE_ACCOUNTS = 'GET_CONNECTED_REMOTE_ACCOUNTS';

export interface GetConnectedRemoteAccountsAction extends Action {
  type: 'GET_CONNECTED_REMOTE_ACCOUNTS';
}

export const getConnectedRemoteAccounts = (): GetConnectedRemoteAccountsAction => {
  return {
    type: GET_CONNECTED_REMOTE_ACCOUNTS,
  };
};
