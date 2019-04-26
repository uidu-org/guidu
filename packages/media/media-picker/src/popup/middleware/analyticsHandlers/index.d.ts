import { GasCorePayload, GasScreenEventPayload } from '@atlaskit/analytics-gas-types';
import { Action, MiddlewareAPI } from 'redux';
import { State } from '../../domain';
export declare type BasePayload = GasCorePayload | GasScreenEventPayload;
export declare type Payload = {
    action?: string;
} & BasePayload;
export declare type HandlerResult = Payload[] | void;
export declare const buttonClickPayload: GasCorePayload & {
    action: string;
};
declare const _default: ((action: Action<any>, store: MiddlewareAPI<State, any>) => HandlerResult)[];
export default _default;
