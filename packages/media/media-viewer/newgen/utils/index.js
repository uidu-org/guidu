import * as tslib_1 from "tslib";
import { isClientBasedAuth, } from '@uidu/media-core';
import { stringify } from 'query-string';
// We want to remove constructAuthTokenUrl and use mediaStore instead
// https://product-fabric.atlassian.net/browse/MSW-869
export function constructAuthTokenUrl(url, context, collectionName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var auth;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.config.authProvider({ collectionName: collectionName })];
                case 1:
                    auth = _a.sent();
                    if (isClientBasedAuth(auth)) {
                        return [2 /*return*/, buildClientBasedUrl(auth.baseUrl, url, auth.token, auth.clientId, collectionName)];
                    }
                    else {
                        return [2 /*return*/, buildIssuerBasedUrl(auth.baseUrl, url, auth.token, auth.asapIssuer, collectionName)];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function buildClientBasedUrl(host, url, token, client, collection) {
    return buildUrl(host, url, { client: client, collection: collection, token: token });
}
function buildIssuerBasedUrl(host, url, token, issuer, collection) {
    return buildUrl(host, url, { issuer: issuer, collection: collection, token: token });
}
function buildUrl(host, url, query) {
    var separator = url.indexOf('?') > -1 ? '&' : '?';
    return "" + host + url + separator + stringify(query);
}
export var toIdentifier = function (item, collectionName) {
    return {
        id: item.id,
        mediaItemType: 'file',
        occurrenceKey: item.occurrenceKey,
        collectionName: collectionName,
    };
};
export var getSelectedIndex = function (items, selectedItem) {
    return items.findIndex(function (item) {
        return item.id === selectedItem.id &&
            item.occurrenceKey === selectedItem.occurrenceKey;
    });
};
//# sourceMappingURL=index.js.map