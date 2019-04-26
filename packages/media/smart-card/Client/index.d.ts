import { Observable } from 'rxjs/Observable';
import { ObjectState, DefinedState, ErroredState, ObjectStatus, AuthService, NotFoundState } from './types';
import { Store } from './store';
import { StateWatch } from './stateWatcher';
import { F1 } from './utils';
import { GasPayload } from '@atlaskit/analytics-gas-types';
import Environments from '../environments';
export declare type RemoteResourceAuthConfig = {
    key: string;
    displayName: string;
    url: string;
};
export declare type ResolveResponse = {
    meta: {
        visibility: 'public' | 'restricted' | 'other' | 'not_found';
        access: 'granted' | 'unauthorized' | 'forbidden';
        auth: RemoteResourceAuthConfig[];
        definitionId: string;
    };
    data?: {
        [name: string]: any;
    };
};
export declare type ClientConfig = {
    cacheLifespan?: number;
    getNowTimeFn?: () => number;
    loadingStateDelay?: number;
};
export declare type ClientEnvironment = {
    resolverURL: string;
};
export declare type EnvironmentsKeys = keyof typeof Environments;
export interface Client {
    fetchData(url: string): Promise<ResolveResponse>;
}
export declare class Client implements Client {
    cacheLifespan: number;
    store: Store<ObjectState>;
    loadingStateDelay: number;
    env: ClientEnvironment;
    constructor(config?: ClientConfig, envKey?: EnvironmentsKeys);
    startStreaming(objectUrl: string): Observable<ErroredState | NotFoundState | DefinedState>;
    /**
     * A card should register itself using this method.
     *
     * We're trying to match a DefinitionId to a bunch of URLs and each URL to a callback.
     *
     * As such, when a card gives us the URL we can fetch data+DefinitionId from the ORS,
     * then use that definitionId to find cards that has to be updated.
     *
     * @param url the url that card holds
     * @param fn the callback that can be called after the data has been resolved for that card.
     */
    register(url: string): StateWatch<ObjectState>;
    deregister(url: string, uuid: string): Client;
    resolve(url: string, handleAnalyticsCallback?: F1<GasPayload, void>, cb?: () => void): void;
    reload(urlToReload: string, handleAnalyticsCallback?: F1<GasPayload, void>, definitionIdFromCard?: string): void;
}
export { ObjectStatus, ObjectState, AuthService };
