import { Action } from 'redux';
import { ServiceName } from '../domain';
export declare const CHANGE_ACCOUNT = "CHANGE_ACCOUNT";
export interface ChangeAccountAction {
    readonly type: 'CHANGE_ACCOUNT';
    readonly serviceName: ServiceName;
    readonly accountId: string;
}
export declare function isChangeAccountAction(action: Action): action is ChangeAccountAction;
export declare function changeAccount(serviceName: ServiceName, accountId: string): ChangeAccountAction;
