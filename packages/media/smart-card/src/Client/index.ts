import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';
import { fromPromise } from 'rxjs/observable/fromPromise';
import fetch$ from './fetch';
import { map } from 'rxjs/operators/map';
import { delay } from 'rxjs/operators/delay';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { catchError } from 'rxjs/operators/catchError';
import {
  ObjectState,
  DefinedState,
  DefinedStatus,
  ErroredState,
  ObjectStatus,
  AuthService,
  NotFoundState,
  ResolvingState,
} from './types';
import { Store } from './store';
import { StateWatch } from './stateWatcher';
import { F1 } from './utils';
import { resolvedEvent, unresolvedEvent } from '../analytics';
import { GasPayload } from '@atlaskit/analytics-gas-types';
import Environments from '../environments';

// TODO: add some form of caching so that urls not currently loaded will still be fast

const DEFAULT_CACHE_LIFESPAN = 15 * 1000;
const DEFAULT_LOADING_STATE_DELAY = 1200;

export type RemoteResourceAuthConfig = {
  key: string;
  displayName: string;
  url: string;
};

// @see https://product-fabric.atlassian.net/wiki/spaces/CS/pages/279347271/Object+Provider
export type ResolveResponse = {
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

const convertAuthToService = (auth: {
  key: string;
  displayName: string;
  url: string;
}): AuthService => ({
  id: auth.key,
  name: auth.displayName,
  startAuthUrl: auth.url,
});

const statusByAccess = (
  status: DefinedStatus,
  json: ResolveResponse,
): DefinedState => ({
  status: status,
  definitionId: json.meta.definitionId,
  services: json.meta.auth.map(convertAuthToService),
  data: json.data,
});

const responseToStateMapper = (
  json: ResolveResponse,
): NotFoundState | DefinedState => {
  if (json.meta.visibility === 'not_found') {
    return { status: 'not-found' };
  }
  switch (json.meta.access) {
    case 'forbidden':
      return statusByAccess('forbidden', json);
    case 'unauthorized':
      return statusByAccess('unauthorized', json);
    default:
      return statusByAccess('resolved', json);
  }
};

const filterUrlsByDefId = (
  store: Store<ObjectState>,
  defId: string,
  urls: string[],
): string[] =>
  urls.filter(url => {
    const entry = store.get(url);
    const entryDefId = entry && entry.getProp<DefinedState>('definitionId');
    return entryDefId === defId;
  });

const unresolvedUrls = (store: Store<ObjectState>, urls: string[]): string[] =>
  urls.filter(url => {
    const entry = store.get(url);
    const entryStatus = entry && entry.getProp('status');
    return entryStatus !== 'resolved';
  });

const urlsWithoutDefinitionId = (
  store: Store<ObjectState>,
  urls: string[],
): string[] =>
  urls.filter(url => {
    const entry = store.get(url);
    const defId = entry && entry.getProp<DefinedState>('definitionId');
    return defId === undefined;
  });

const getUrlsToReload = (
  store: Store<ObjectState>,
  definitionIdFromCard?: string,
) => {
  if (definitionIdFromCard) {
    return unresolvedUrls(
      store,
      filterUrlsByDefId(store, definitionIdFromCard, store.getAllUrls()),
    );
  } else {
    return urlsWithoutDefinitionId(store, store.getAllUrls());
  }
};

export type ClientConfig = {
  cacheLifespan?: number;
  getNowTimeFn?: () => number;
  loadingStateDelay?: number;
};

export type ClientEnvironment = {
  resolverURL: string;
};

export type EnvironmentsKeys = keyof typeof Environments;

export interface Client {
  fetchData(url: string): Promise<ResolveResponse>;
}

export class Client implements Client {
  cacheLifespan: number;
  store: Store<ObjectState>;
  loadingStateDelay: number;
  env: ClientEnvironment;

  constructor(config?: ClientConfig, envKey: EnvironmentsKeys = 'prod') {
    this.env = Environments[envKey]
      ? Environments[envKey]
      : Environments['prod'];

    this.cacheLifespan =
      (config && config.cacheLifespan) || DEFAULT_CACHE_LIFESPAN;
    this.store = new Store<ObjectState>(
      (config && config.getNowTimeFn) || Date.now,
    );
    this.loadingStateDelay =
      (config && config.loadingStateDelay) || DEFAULT_LOADING_STATE_DELAY;
  }

  fetchData(objectUrl: string): Promise<ResolveResponse> {
    return fetch$<ResolveResponse>('post', `${this.env.resolverURL}/resolve`, {
      resourceUrl: encodeURI(objectUrl),
    }).toPromise();
  }

  startStreaming(
    objectUrl: string,
  ): Observable<ErroredState | NotFoundState | DefinedState> {
    return fromPromise(this.fetchData(objectUrl)).pipe(
      map(responseToStateMapper),
      catchError(() => of({ status: 'errored' } as ErroredState)),
    );
  }

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
  register(url: string): StateWatch<ObjectState> {
    if (!this.store.exists(url)) {
      return this.store.init(url);
    }

    return this.store.get(url)!;
  }

  // let's say when a card gets unmounted, we need to "clean-up"
  deregister(url: string, uuid: string): Client {
    const storeEntry = this.store.get(url);

    if (storeEntry) {
      storeEntry.unsubscribe(uuid);
    }

    return this;
  }

  resolve(
    url: string,
    handleAnalyticsCallback?: F1<GasPayload, void>,
    cb?: () => void,
  ): void {
    if (!this.store.exists(url)) {
      throw new Error('Please, register a smart card before calling get()');
    }

    const entry = this.store.get(url);

    // Only load the data from network after it's expired in the cache
    if (entry && entry.hasExpired()) {
      const data$ = this.startStreaming(url);
      const resolving$ = of(<ResolvingState>{ status: 'resolving' }).pipe(
        delay(this.loadingStateDelay),
        takeUntil(data$),
      );

      merge(resolving$, data$).subscribe(state => {
        if (handleAnalyticsCallback) {
          if (state.status === 'resolved') {
            handleAnalyticsCallback(resolvedEvent(url));
          } else {
            handleAnalyticsCallback(unresolvedEvent(url, state));
          }
        }

        this.store.set(url, state, this.cacheLifespan);

        if (cb) {
          cb();
        }
      });
    }
  }

  reload(
    urlToReload: string,
    handleAnalyticsCallback?: F1<GasPayload, void>,
    definitionIdFromCard?: string,
  ): void {
    this.store.get(urlToReload)!.invalidate();

    this.resolve(urlToReload, () => {
      getUrlsToReload(this.store, definitionIdFromCard)
        .filter(otherUrl => otherUrl !== urlToReload)
        .forEach(otherUrl => {
          this.store.get(otherUrl)!.invalidate();
          this.resolve(otherUrl, handleAnalyticsCallback);
        });
    });
  }
}

export { ObjectStatus, ObjectState, AuthService };
