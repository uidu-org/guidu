import { ServiceName } from '../domain';
export interface Account {
    readonly id: string;
    readonly name: ServiceName;
}
export declare const REQUEST_UNLINK_CLOUD_ACCOUNT = "ACCOUNT_UNLINK_CLOUD_REQUEST";
export interface RequestUnlinkCloudAccountAction {
    readonly type: 'ACCOUNT_UNLINK_CLOUD_REQUEST';
    readonly account: Account;
}
export declare function requestUnlinkCloudAccount(account: Account): RequestUnlinkCloudAccountAction;
export declare const UNLINK_ACCOUNT = "ACCOUNT_CLOUD_UNLINK";
export interface UnlinkCloudAccountAction {
    readonly type: 'ACCOUNT_CLOUD_UNLINK';
    readonly account: Account;
}
export declare function unlinkCloudAccount(account: Account): UnlinkCloudAccountAction;
