import { Action } from 'redux';
export declare const GET_CONNECTED_REMOTE_ACCOUNTS = "GET_CONNECTED_REMOTE_ACCOUNTS";
export interface GetConnectedRemoteAccountsAction extends Action {
    type: 'GET_CONNECTED_REMOTE_ACCOUNTS';
}
export declare const getConnectedRemoteAccounts: () => GetConnectedRemoteAccountsAction;
