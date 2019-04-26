import { Action } from 'redux';
import { ServiceName } from '../domain';
export declare const CHANGE_SERVICE = "SERVICE_CHANGE";
export interface ChangeServiceAction extends Action {
    readonly type: 'SERVICE_CHANGE';
    readonly serviceName: ServiceName;
}
export declare function isChangeServiceAction(action: Action): action is ChangeServiceAction;
export declare function changeService(serviceName: ServiceName): ChangeServiceAction;
