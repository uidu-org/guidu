"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleFetchErrorsWith = exports.signedFetchNew = exports.signedFetch = exports.getCsrfToken = void 0;

require("whatwg-fetch/dist/fetch.umd");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getCsrfToken = function getCsrfToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
};

exports.getCsrfToken = getCsrfToken;

var signedFetch = function signedFetch(req, init) {
  var headers = new Headers({
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': getCsrfToken(),
    Accept: 'application/json, */*'
  });

  if (init.headers) {
    Object.keys(init.headers).forEach(function (key) {
      headers.append(key, init.headers[key]);
    });
  }

  var request = new Request(req, _objectSpread({}, init, {
    headers: headers,
    credentials: 'same-origin'
  }));
  return fetch(request); // eslint-disable-line compat/compat
}; // Payload should always be a FormData


exports.signedFetch = signedFetch;

var signedFetchNew = function signedFetchNew(url, method, payload) {
  var headers = new Headers({
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': getCsrfToken(),
    Accept: 'application/json, */*'
  });
  var request = new Request(url, {
    method: method,
    body: payload,
    headers: headers,
    credentials: 'same-origin'
  });
  return fetch(request); // eslint-disable-line compat/compat
};

exports.signedFetchNew = signedFetchNew;

var handleFetchErrorsWith = function handleFetchErrorsWith(response, dispatch) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  return response.json().then(function (json) {
    if (!response.ok) {
      dispatch(callback());
      return Promise.reject(json.error);
    }

    return json;
  }, function () {
    dispatch(callback());
    return Promise.reject('Network error');
  });
};

exports.handleFetchErrorsWith = handleFetchErrorsWith;