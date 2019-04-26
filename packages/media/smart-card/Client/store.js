import { StateWatch } from './stateWatcher';
var Store = /** @class */ (function () {
    function Store(getNowTimeFn) {
        this.getNowTimeFn = getNowTimeFn;
        this.store = {};
        this.analyticsCallbacksPool = {};
    }
    Store.prototype.get = function (url) {
        return this.store[url];
    };
    Store.prototype.getAllUrls = function () {
        return Object.keys(this.store);
    };
    Store.prototype.init = function (url) {
        if (this.store[url]) {
            throw new Error("Reinit the watcher for url: " + url);
        }
        return (this.store[url] = new StateWatch(this.getNowTimeFn));
    };
    Store.prototype.set = function (url, data, lifespan) {
        if (!this.store[url]) {
            throw new Error("Set for non-existent url: " + url);
        }
        return this.store[url].update(data, lifespan);
    };
    Store.prototype.exists = function (url) {
        return this.store[url] !== undefined;
    };
    return Store;
}());
export { Store };
//# sourceMappingURL=store.js.map