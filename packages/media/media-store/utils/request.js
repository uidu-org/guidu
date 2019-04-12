import * as tslib_1 from "tslib";
import { parse, stringify } from 'query-string';
import { isClientBasedAuth } from '../models/auth';
import { mapAuthToQueryParameters } from '../models/auth-query-parameters';
export function request(url, options, controller) {
    if (options === void 0) { options = {}; }
    var _a = options.method, method = _a === void 0 ? 'GET' : _a, auth = options.auth, params = options.params, headers = options.headers, body = options.body;
    var processFetchResponse = function (response) {
        if (response.ok || response.redirected) {
            return response;
        }
        else {
            throw response;
        }
    };
    if (method === 'GET') {
        return fetch(createUrl(url, { params: params, auth: auth }), {
            method: method,
            body: body,
            headers: headers,
            signal: controller && controller.signal,
        }).then(processFetchResponse);
    }
    else {
        return fetch(createUrl(url, { params: params }), {
            method: method,
            body: body,
            headers: withAuth(auth)(headers),
        }).then(processFetchResponse);
    }
}
export function mapResponseToJson(response) {
    return response.json();
}
export function mapResponseToBlob(response) {
    return response.blob();
}
export function mapResponseToVoid(_response) {
    return Promise.resolve();
}
export function createUrl(url, _a) {
    var params = _a.params, auth = _a.auth;
    var _b = extract(url), baseUrl = _b.baseUrl, queryParams = _b.queryParams;
    var authParams = auth && mapAuthToQueryParameters(auth);
    var queryString = stringify(tslib_1.__assign({}, queryParams, params, authParams));
    var shouldAppendQueryString = queryString.length > 0;
    return "" + baseUrl + (shouldAppendQueryString ? "?" + queryString : '');
}
function withAuth(auth) {
    return function (headers) {
        if (auth) {
            return tslib_1.__assign({}, (headers || {}), mapAuthToRequestHeaders(auth));
        }
        else {
            return headers;
        }
    };
}
function extract(url) {
    var index = url.indexOf('?');
    if (index > 0) {
        return {
            baseUrl: url.substring(0, index),
            queryParams: parse(url.substring(index + 1, url.length)),
        };
    }
    else {
        return {
            baseUrl: url,
        };
    }
}
function mapAuthToRequestHeaders(auth) {
    if (isClientBasedAuth(auth)) {
        return {
            'X-Client-Id': auth.clientId,
            Authorization: "Bearer " + auth.token,
        };
    }
    else {
        return {
            'X-Issuer': auth.asapIssuer,
            Authorization: "Bearer " + auth.token,
        };
    }
}
export default request;
//# sourceMappingURL=request.js.map