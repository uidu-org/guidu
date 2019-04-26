import * as tslib_1 from "tslib";
import { css } from 'styled-components';
import axios from 'axios';
import getUrls from 'get-urls';
var REGEX_HTTPS = /^https/;
var REGEX_LOCALHOST = /http:\/\/localhost/;
export var isFunction = function (fn) { return typeof fn === 'function'; };
export var isObject = function (obj) { return typeof obj === 'object'; };
export var isNil = function (value) { return value == null; };
export var getUrlPath = function (data) { return (data && isObject(data) ? data.url : data); };
export var someProp = function (data, props) {
    return data[props.find(function (prop) { return data[prop] !== null && data[prop] !== undefined; })];
};
export var media = {
    mobile: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n    @media (max-width: 48em) {\n      ", ";\n    }\n  "], ["\n    @media (max-width: 48em) {\n      ", ";\n    }\n  "])), css(function () { return args; }));
    },
    desktop: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return css(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n    @media (min-width: 48em) {\n      ", ";\n    }\n  "], ["\n    @media (min-width: 48em) {\n      ", ";\n    }\n  "])), css(function () { return args; }));
    },
};
var apiValue = function (key, value) {
    return value === true ? "" + key : key + "=" + value;
};
export var defaultApiParameters = {
    video: false,
    contrast: false,
    screenshot: false,
    prerender: 'auto',
};
export var createApiUrl = function (props) {
    var apiKey = props.apiKey, targetUrl = props.url, prerender = props.prerender, contrast = props.contrast, media = props.media;
    var takeScreenshot = media.includes('screenshot');
    var hasVideo = media.includes('video');
    var url = "https://p2jxzlrab4.execute-api.eu-west-1.amazonaws.com/dev?url=" + encodeURIComponent(targetUrl);
    if (hasVideo) {
        url = url + "&" + apiValue('video', hasVideo);
    }
    if (!isNil(contrast) && contrast !== defaultApiParameters.contrast) {
        url = url + "&" + apiValue('palette', contrast);
    }
    if (!isNil(prerender) && prerender !== defaultApiParameters.prerender) {
        url = url + "&" + apiValue('prerender', prerender);
    }
    if (takeScreenshot) {
        url = url + "&" + apiValue('screenshot', takeScreenshot);
    }
    return url;
};
export var fetchFromApiUrl = function (_a, source) {
    var apiKey = _a.apiKey, apiUrl = _a.apiUrl;
    var headers = apiKey ? { 'x-api-key': apiKey } : {};
    console.log(source);
    return axios.get(apiUrl, { headers: headers, cancelToken: source.token }).then(function (res) {
        console.log(res);
        return res.data;
    });
};
export var fetchFromApi = function (props, source) {
    var apiUrl = createApiUrl(props);
    return fetchFromApiUrl(tslib_1.__assign({ apiUrl: apiUrl }, props), source);
};
export var isLarge = function (cardSize) { return cardSize === 'large'; };
export var imageProxy = function (url) {
    if (!url || REGEX_LOCALHOST.test(url) || REGEX_HTTPS.test(url))
        return url;
    return "https://images.weserv.nl/?url=" + encodeURIComponent(url).replace('http://', '');
};
export var extractFirstUrl = function (text) {
    var urlsSet = getUrls(text);
    if (urlsSet.size == 0) {
        return null;
    }
    return Array.from(urlsSet)[0];
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map