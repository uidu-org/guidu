import * as tslib_1 from "tslib";
import { exactMatch, fillInResponse } from '..';
import { userCollection } from '../staticCommon';
export var userCollectionFetch = function (context) { return function (req, res) {
    var _a;
    var data = {
        method: 'GET',
        url: {
            path: "/collection/" + context().userContext.collectionName + "/items",
            query: {
                sortDirection: 'desc',
                limit: '30',
            },
        },
        headers: {
            accept: 'application/json, text/plain, */*',
            'x-client-id': "" + context().userContext.auth.clientId,
            authorization: "Bearer " + context().userContext.auth.token,
        },
        body: null,
    };
    if (exactMatch(req, data)) {
        var resdata = {
            status: 200,
            reason: '',
            headers: {
                date: 'Tue, 20 Feb 2018 00',
                'x-content-type-options': 'nosniff',
                server: 'nginx/1.12.2',
                'x-b3-traceid': '4284f6b051da6b7e',
                'access-control-allow-origin': '*',
                'x-download-options': 'noopen',
                'x-frame-options': 'SAMEORIGIN',
                'content-type': 'application/json',
                status: '200',
                'access-control-expose-headers': 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range',
                'x-b3-spanid': '4284f6b051da6b7e',
                'strict-transport-security': 'max-age=15552000; includeSubDomains',
                'x-dns-prefetch-control': 'off',
                'content-length': '10504',
                'x-xss-protection': '1; mode=block',
            },
            body: JSON.stringify({
                data: {
                    contents: userCollection,
                },
            }),
        };
        (_a = context().userContext.collection).push.apply(_a, tslib_1.__spread(userCollection));
        fillInResponse(res, resdata);
        return res;
    }
    return undefined;
}; };
//# sourceMappingURL=userCollectionFetch.js.map