import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';
import { fromPromise } from 'rxjs/observable/fromPromise';
import fetch$ from './fetch';
import { map } from 'rxjs/operators/map';
import { delay } from 'rxjs/operators/delay';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { catchError } from 'rxjs/operators/catchError';
import { Store } from './store';
import { resolvedEvent, unresolvedEvent } from '../analytics';
import Environments from '../environments';
// TODO: add some form of caching so that urls not currently loaded will still be fast
var DEFAULT_CACHE_LIFESPAN = 15 * 1000;
var DEFAULT_LOADING_STATE_DELAY = 1200;
var convertAuthToService = function (auth) { return ({
    id: auth.key,
    name: auth.displayName,
    startAuthUrl: auth.url,
}); };
var statusByAccess = function (status, json) { return ({
    status: status,
    definitionId: json.meta.definitionId,
    services: json.meta.auth.map(convertAuthToService),
    data: json.data,
}); };
var responseToStateMapper = function (json) {
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
var filterUrlsByDefId = function (store, defId, urls) {
    return urls.filter(function (url) {
        var entry = store.get(url);
        var entryDefId = entry && entry.getProp('definitionId');
        return entryDefId === defId;
    });
};
var unresolvedUrls = function (store, urls) {
    return urls.filter(function (url) {
        var entry = store.get(url);
        var entryStatus = entry && entry.getProp('status');
        return entryStatus !== 'resolved';
    });
};
var urlsWithoutDefinitionId = function (store, urls) {
    return urls.filter(function (url) {
        var entry = store.get(url);
        var defId = entry && entry.getProp('definitionId');
        return defId === undefined;
    });
};
var getUrlsToReload = function (store, definitionIdFromCard) {
    if (definitionIdFromCard) {
        return unresolvedUrls(store, filterUrlsByDefId(store, definitionIdFromCard, store.getAllUrls()));
    }
    else {
        return urlsWithoutDefinitionId(store, store.getAllUrls());
    }
};
var Client = /** @class */ (function () {
    function Client(config, envKey) {
        if (envKey === void 0) { envKey = 'prod'; }
        this.env = Environments[envKey]
            ? Environments[envKey]
            : Environments['prod'];
        this.cacheLifespan =
            (config && config.cacheLifespan) || DEFAULT_CACHE_LIFESPAN;
        this.store = new Store((config && config.getNowTimeFn) || Date.now);
        this.loadingStateDelay =
            (config && config.loadingStateDelay) || DEFAULT_LOADING_STATE_DELAY;
    }
    Client.prototype.fetchData = function (objectUrl) {
        return fetch$('post', this.env.resolverURL + "/resolve", {
            resourceUrl: encodeURI(objectUrl),
        }).toPromise();
    };
    Client.prototype.startStreaming = function (objectUrl) {
        return fromPromise(this.fetchData(objectUrl)).pipe(map(responseToStateMapper), catchError(function () { return of({ status: 'errored' }); }));
    };
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
    Client.prototype.register = function (url) {
        if (!this.store.exists(url)) {
            return this.store.init(url);
        }
        return this.store.get(url);
    };
    // let's say when a card gets unmounted, we need to "clean-up"
    Client.prototype.deregister = function (url, uuid) {
        var storeEntry = this.store.get(url);
        if (storeEntry) {
            storeEntry.unsubscribe(uuid);
        }
        return this;
    };
    Client.prototype.resolve = function (url, handleAnalyticsCallback, cb) {
        var _this = this;
        if (!this.store.exists(url)) {
            throw new Error('Please, register a smart card before calling get()');
        }
        var entry = this.store.get(url);
        // Only load the data from network after it's expired in the cache
        if (entry && entry.hasExpired()) {
            var data$ = this.startStreaming(url);
            var resolving$ = of({ status: 'resolving' }).pipe(delay(this.loadingStateDelay), takeUntil(data$));
            merge(resolving$, data$).subscribe(function (state) {
                if (handleAnalyticsCallback) {
                    if (state.status === 'resolved') {
                        handleAnalyticsCallback(resolvedEvent(url));
                    }
                    else {
                        handleAnalyticsCallback(unresolvedEvent(url, state));
                    }
                }
                _this.store.set(url, state, _this.cacheLifespan);
                if (cb) {
                    cb();
                }
            });
        }
    };
    Client.prototype.reload = function (urlToReload, handleAnalyticsCallback, definitionIdFromCard) {
        var _this = this;
        this.store.get(urlToReload).invalidate();
        this.resolve(urlToReload, function () {
            getUrlsToReload(_this.store, definitionIdFromCard)
                .filter(function (otherUrl) { return otherUrl !== urlToReload; })
                .forEach(function (otherUrl) {
                _this.store.get(otherUrl).invalidate();
                _this.resolve(otherUrl, handleAnalyticsCallback);
            });
        });
    };
    return Client;
}());
export { Client };
//# sourceMappingURL=index.js.map