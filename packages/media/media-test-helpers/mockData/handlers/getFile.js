import * as tslib_1 from "tslib";
import { exactMatch, fillInResponse, } from '..';
export var getFile = function (context) { return function (req, res) {
    var requestDataTemplate = function (collectionName) { return function (file) { return ({
        method: 'GET',
        url: {
            path: "/file/" + file.id,
            query: {
                collection: collectionName,
            },
        },
        headers: {
            accept: 'application/json, text/plain, */*',
        },
        body: null,
    }); }; };
    var availableFiles = tslib_1.__spread(context().userContext.collection, context().tenantContext.collection);
    var userData = context().userContext.collection.map(requestDataTemplate(context().userContext.collectionName));
    var tenantData = context().tenantContext.collection.map(requestDataTemplate(context().tenantContext.collectionName));
    var data = tslib_1.__spread(tenantData, userData);
    var matchingDataItem = data.reduce(function (ret, dataItem) { return (exactMatch(req, dataItem) ? dataItem : ret); }, undefined);
    if (matchingDataItem) {
        var fileId_1 = (/\/file\/(.*)/.exec(req.url().path || '') || [])[1];
        var resdata = {
            status: 200,
            reason: '',
            headers: {
                date: 'Tue, 20 Feb 2018 01',
                'x-content-type-options': 'nosniff',
                server: 'nginx/1.12.2',
                'x-b3-traceid': '9f37ad476c47648e',
                'access-control-allow-origin': '*',
                'x-download-options': 'noopen',
                'x-frame-options': 'SAMEORIGIN',
                'content-type': 'application/json',
                status: '200',
                'access-control-expose-headers': 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range',
                'x-b3-spanid': '9f37ad476c47648e',
                'strict-transport-security': 'max-age=15552000; includeSubDomains',
                'x-dns-prefetch-control': 'off',
                'content-length': '1088',
                'x-xss-protection': '1; mode=block',
            },
            body: JSON.stringify({
                data: {
                    mediaType: 'image',
                    mimeType: 'image/jpeg',
                    name: availableFiles.reduce(function (ret, item) { return (item.id === fileId_1 ? item : ret); }, { details: { name: '' } }).details.name,
                    size: availableFiles.reduce(function (ret, item) { return (item.id === fileId_1 ? item : ret); }, { details: { size: 0 } }).details.size,
                    processingStatus: 'succeeded',
                    artifacts: {
                        'meta.json': {
                            url: "/file/" + fileId_1 + "/artifact/meta.json/binary",
                            processingStatus: 'succeeded',
                        },
                        'thumb_120.jpg': {
                            url: "/file/" + fileId_1 + "/artifact/thumb_120.jpg/binary",
                            processingStatus: 'succeeded',
                        },
                        'thumb.jpg': {
                            url: "/file/" + fileId_1 + "/artifact/thumb_120.jpg/binary",
                            processingStatus: 'succeeded',
                        },
                        'image.jpg': {
                            url: "/file/" + fileId_1 + "/artifact/image.jpg/binary",
                            processingStatus: 'succeeded',
                        },
                        'thumb_320.jpg': {
                            url: "/file/" + fileId_1 + "/artifact/thumb_320.jpg/binary",
                            processingStatus: 'succeeded',
                        },
                        'thumb_large.jpg': {
                            url: "/file/" + fileId_1 + "/artifact/thumb_320.jpg/binary",
                            processingStatus: 'succeeded',
                        },
                    },
                    id: fileId_1,
                },
            }),
        };
        fillInResponse(res, resdata);
        return res;
    }
    return undefined;
}; };
//# sourceMappingURL=getFile.js.map