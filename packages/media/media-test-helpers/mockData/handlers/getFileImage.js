import * as tslib_1 from "tslib";
import { exactMatch, fillInResponse, dataURItoBlob, } from '..';
import { files } from '../staticCommon';
export var getFileImage = function (context) { return function (req, res) {
    var requestDataTemplate = function (collectionName) { return function (file) { return ({
        method: 'GET',
        url: {
            path: "/file/" + file.id + "/image",
            query: {
                collection: collectionName,
            },
        },
        headers: {
            accept: 'image/webp,image/*,*/*;q=0.8',
        },
        body: null,
    }); }; };
    var userData = context().userContext.collection.map(requestDataTemplate(context().userContext.collectionName));
    var tenantData = context().tenantContext.collection.map(requestDataTemplate(context().tenantContext.collectionName));
    var data = tslib_1.__spread(userData, tenantData);
    var matchingDataItem = data.reduce(function (ret, dataItem) { return (exactMatch(req, dataItem) ? dataItem : ret); }, undefined);
    if (matchingDataItem) {
        var resdata = {
            status: 200,
            reason: '',
            headers: {
                date: 'Tue, 20 Feb 2018 01',
                'x-content-type-options': 'nosniff',
                server: 'nginx/1.12.2',
                'x-b3-traceid': '9cd99f83c26eb3e7',
                'access-control-allow-origin': '*',
                'x-download-options': 'noopen',
                'x-frame-options': 'SAMEORIGIN',
                'content-type': 'image/webp',
                status: '200',
                'access-control-expose-headers': 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range',
                'cache-control': 'private, max-age=3600',
                'x-b3-spanid': '9cd99f83c26eb3e7',
                'x-dns-prefetch-control': 'off',
                'content-length': '5558',
                'x-xss-protection': '1; mode=block',
            },
            body: dataURItoBlob(files.reduce(function (ret, file) {
                return "/file/" + file.id + "/image" ===
                    (matchingDataItem.url || { path: '' }).path
                    ? file
                    : ret;
            }, { dataUri: '' }).dataUri),
        };
        fillInResponse(res, resdata);
        return res;
    }
    return undefined;
}; };
//# sourceMappingURL=getFileImage.js.map