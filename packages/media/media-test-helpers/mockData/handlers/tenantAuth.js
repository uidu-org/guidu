import { exactMatch, fillInResponse } from '..';
import { userAuthProviderBaseURL } from '../..';
export var tenantAuth = function (context) { return function (req, res) {
    var bodyPerms = {
        access: {
            'urn:filestore:chunk:*': ['create', 'read'],
            'urn:filestore:upload': ['create'],
            'urn:filestore:upload:*': ['read', 'update'],
        },
    };
    bodyPerms.access["urn:filestore:collection:" + context().tenantContext.collectionName] = ['read', 'insert'];
    var data1 = {
        method: 'POST',
        url: {
            path: '/media-playground/api/token/tenant',
            query: {
                collection: context().tenantContext.collectionName,
                environment: '',
            },
        },
        headers: {
            accept: 'application/json, text/plain, */*',
            'content-type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(bodyPerms),
    };
    var data2 = {
        method: 'GET',
        url: {
            path: '/media-playground/api/token/tenant',
            query: {
                collection: context().tenantContext.collectionName,
                environment: '',
            },
        },
        headers: {
            accept: 'application/json, text/plain, */*',
        },
        body: null,
    };
    if (exactMatch(req, data1) || exactMatch(req, data2)) {
        var clientId = '5a9812fc-d029-4a39-8a46-d3cc36eed7ab';
        var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTUzNjI6YjllMGUwYjUtYzYzOS00ZmNiLTk2ZjItMDZmZTZhZTc5NGJlIiwiYWNjZXNzIjp7InVybjpmaWxlc3RvcmU6Y29sbGVjdGlvbjpNZWRpYVNlcnZpY2VzU2FtcGxlIjpbInJlYWQiLCJpbnNlcnQiXSwidXJuOmZpbGVzdG9yZTpjaHVuazoqIjpbImNyZWF0ZSIsInJlYWQiXSwidXJuOmZpbGVzdG9yZTp1cGxvYWQiOlsiY3JlYXRlIl0sInVybjpmaWxlc3RvcmU6dXBsb2FkOioiOlsicmVhZCIsInVwZGF0ZSJdfSwibmJmIjoxNTE5MDkwMDc2LCJleHAiOjE1MTkwOTM2NzYsImlhdCI6MTUxOTA5MDEzNiwiaXNzIjoiNWE5ODEyZmMtZDAyOS00YTM5LThhNDYtZDNjYzM2ZWVkN2FiIn0.7Qr_rZfVLFEBgi5u0xPhjDRCxml75MxDObAhHSnadL4';
        var resdata = {
            status: 200,
            reason: 'OK',
            headers: {
                'access-control-allow-origin': '*',
                date: 'Mon, 19 Feb 2018 23',
                connection: 'keep-alive',
                'x-powered-by': 'Express',
                etag: 'W/25a-6ea8ENhURYqK8jk0lAhNFg',
                'content-length': '602',
                'content-type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                token: token,
                clientId: clientId,
                baseUrl: userAuthProviderBaseURL,
            }),
        };
        context().tenantContext.auth = {
            clientId: clientId,
            token: token,
            baseUrl: userAuthProviderBaseURL,
        };
        fillInResponse(res, resdata);
        return res;
    }
    return undefined;
}; };
//# sourceMappingURL=tenantAuth.js.map