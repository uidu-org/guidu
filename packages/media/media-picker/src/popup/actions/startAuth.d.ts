import { Action } from 'redux';
import { ServiceName } from '../domain';
export declare const START_AUTH = "AUTH_START";
export interface StartAuthAction {
    readonly type: 'AUTH_START';
    readonly serviceName: ServiceName;
}
export declare function isStartAuthAction(action: Action): action is StartAuthAction;
export declare function startAuth(serviceName: ServiceName): StartAuthAction;
