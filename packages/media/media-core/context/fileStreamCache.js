import { LRUCache } from 'lru-fast';
var FileStreamCache = /** @class */ (function () {
    function FileStreamCache() {
        this.fileStreams = new LRUCache(1000);
        this.stateDeferreds = new Map();
    }
    FileStreamCache.prototype.has = function (id) {
        return !!this.fileStreams.find(id);
    };
    FileStreamCache.prototype.set = function (id, fileStream) {
        this.fileStreams.set(id, fileStream);
        var deferred = this.stateDeferreds.get(id);
        if (deferred) {
            fileStream.toPromise().then(function (state) {
                deferred.resolve(state);
            });
        }
    };
    FileStreamCache.prototype.get = function (id) {
        return this.fileStreams.get(id);
    };
    FileStreamCache.prototype.getCurrentState = function (id) {
        var _this = this;
        var state = this.get(id);
        if (state) {
            return state.toPromise();
        }
        var deferred = this.stateDeferreds.get(id);
        if (deferred) {
            return deferred.promise;
        }
        var promise = new Promise(function (resolve) {
            _this.stateDeferreds.set(id, { promise: promise, resolve: resolve });
        });
        return promise;
    };
    FileStreamCache.prototype.getOrInsert = function (id, callback) {
        if (!this.has(id)) {
            this.set(id, callback());
        }
        return this.get(id);
    };
    FileStreamCache.prototype.removeAll = function () {
        this.fileStreams.removeAll();
    };
    FileStreamCache.prototype.remove = function (id) {
        this.fileStreams.remove(id);
    };
    Object.defineProperty(FileStreamCache.prototype, "size", {
        get: function () {
            return this.fileStreams.size;
        },
        enumerable: true,
        configurable: true
    });
    return FileStreamCache;
}());
export { FileStreamCache };
export var fileStreamsCache = new FileStreamCache();
export default FileStreamCache;
//# sourceMappingURL=fileStreamCache.js.map