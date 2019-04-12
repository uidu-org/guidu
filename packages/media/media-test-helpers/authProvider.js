import * as tslib_1 from "tslib";
import axios from 'axios';
import { defaultCollectionName } from './collectionNames';
var cachedAuths = {};
var authProviderBaseURL = 'https://uidu.local:8443/media-playground/api/';
var StoryBookAuthProvider = /** @class */ (function () {
    function StoryBookAuthProvider() {
    }
    StoryBookAuthProvider.create = function (isAsapEnvironment, access) {
        var _this = this;
        var loadTenatAuth = function (collectionName) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var config, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            withCredentials: true,
                            baseURL: authProviderBaseURL,
                            headers: {},
                            params: {
                                collection: collectionName,
                                environment: isAsapEnvironment ? 'asap' : '',
                            },
                        };
                        if (!access) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios.post('/token/tenant', { access: access }, config)];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, axios.get('/token/tenant', config)];
                    case 3:
                        response = _a.sent();
                        _a.label = 4;
                    case 4: 
                    // We leverage the fact, that our internal /toke/tenant API returns data in the same format as Auth
                    return [2 /*return*/, response.data];
                }
            });
        }); };
        return function (authContext) {
            var collectionName = (authContext && authContext.collectionName) || defaultCollectionName;
            var accessStr = access ? JSON.stringify(access) : '';
            var cacheKey = collectionName + "-" + accessStr + "-" + isAsapEnvironment;
            if (!cachedAuths[cacheKey]) {
                cachedAuths[cacheKey] = loadTenatAuth(collectionName);
            }
            return cachedAuths[cacheKey];
        };
    };
    return StoryBookAuthProvider;
}());
export { StoryBookAuthProvider };
//# sourceMappingURL=authProvider.js.map