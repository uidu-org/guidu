import * as tslib_1 from "tslib";
import { MediaStore, } from '@uidu/media-store';
import { CollectionFetcher } from '../collection';
import { FileFetcherImpl } from '../file';
var ContextFactory = /** @class */ (function () {
    function ContextFactory() {
    }
    ContextFactory.create = function (config) {
        return new ContextImpl(config);
    };
    return ContextFactory;
}());
export { ContextFactory };
var ContextImpl = /** @class */ (function () {
    function ContextImpl(config) {
        this.config = config;
        this.mediaStore = new MediaStore({
            authProvider: config.authProvider,
        });
        this.collection = new CollectionFetcher(this.mediaStore);
        this.file = new FileFetcherImpl(this.mediaStore);
    }
    ContextImpl.prototype.getImage = function (id, params, controller) {
        return this.mediaStore.getImage(id, params, controller);
    };
    ContextImpl.prototype.getImageUrl = function (id, params) {
        return this.mediaStore.getFileImageURL(id, params);
    };
    ContextImpl.prototype.getImageMetadata = function (id, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mediaStore.getImageMetadata(id, params)];
                    case 1: return [2 /*return*/, (_a.sent()).metadata];
                }
            });
        });
    };
    return ContextImpl;
}());
//# sourceMappingURL=context.js.map