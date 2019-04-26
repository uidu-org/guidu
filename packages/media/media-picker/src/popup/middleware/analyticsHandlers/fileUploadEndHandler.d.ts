import { Action, MiddlewareAPI } from 'redux';
import { State } from '../../domain';
import { HandlerResult } from '.';
declare const _default: (action: Action<any>, store: MiddlewareAPI<State, any>) => HandlerResult;
export default _default;
