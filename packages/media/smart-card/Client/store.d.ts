import { StateWatch } from './stateWatcher';
import { GetNowTimeFn } from './types';
import { GasPayload } from '@atlaskit/analytics-gas-types';
import { F1 } from './utils';
export declare class Store<T> {
    private getNowTimeFn;
    constructor(getNowTimeFn: GetNowTimeFn);
    store: {
        [K: string]: StateWatch<T>;
    };
    analyticsCallbacksPool: {
        [K: string]: Array<F1<GasPayload, any>>;
    };
    get(url: string): StateWatch<T> | undefined;
    getAllUrls(): string[];
    init(url: string): StateWatch<T>;
    set(url: string, data: T, lifespan: number): void;
    exists(url: string): boolean;
}
