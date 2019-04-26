import { ServiceAccountWithType } from '../domain';
export declare const UPDATE_SERVICE_LIST = "SERVICE_LIST_UPDATE";
export interface UpdateServiceListAction {
    readonly type: 'SERVICE_LIST_UPDATE';
    readonly accounts: Promise<ServiceAccountWithType[]>;
}
export declare function updateServiceList(accounts: Promise<ServiceAccountWithType[]>): UpdateServiceListAction;
