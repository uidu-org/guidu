"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LaunchDarklyClientProviderForTesting = void 0;

var _react = _interopRequireDefault(require("react"));

var _ldclientJs = _interopRequireDefault(require("ldclient-js"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _constants = require("../../constants");

var clientKey = function clientKey(websiteEnv) {
  switch (websiteEnv) {
    case 'production':
      return _constants.LAUNCH_DARKLY_PRODUCTION_KEY;

    case 'staging':
      return _constants.LAUNCH_DARKLY_STAGING_KEY;

    default:
      return _constants.LAUNCH_DARKLY_LOCAL_KEY;
  }
};

var id = function id() {
  try {
    var _id = localStorage.getItem('atlaskit-website-ld-user-key');

    if (_id === null) {
      _id = (0, _v.default)();
      localStorage.setItem('atlaskit-website-ld-user-key', _id);
    }

    return _id;
  } catch (e) {
    // localStorage is not available just use a new id
    return (0, _v.default)();
  }
};

var anonymousUser = function anonymousUser() {
  return {
    key: id(),
    anonymous: true
  };
}; // This creates a getter that is passed down context. The advantage of a getter
// is that the client is only initialized when feature flags are needed, rather when
// this file is loaded.


var createClient = function createClient() {
  var client;
  return function () {
    if (!client) {
      client = _ldclientJs.default.initialize(clientKey('development'), anonymousUser(), {
        bootstrap: 'localStorage'
      });
    }

    return client;
  };
};

var _React$createContext = _react.default.createContext(createClient()),
    Consumer = _React$createContext.Consumer,
    Provider = _React$createContext.Provider;

var LaunchDarklyClientProviderForTesting = Provider;
exports.LaunchDarklyClientProviderForTesting = LaunchDarklyClientProviderForTesting;

var FeatureFlag = function FeatureFlag(_ref) {
  var children = _ref.children,
      name = _ref.name,
      _ref$enabledByDefault = _ref.enabledByDefault,
      enabledByDefault = _ref$enabledByDefault === void 0 ? false : _ref$enabledByDefault;
  return _react.default.createElement(Consumer, null, function (getClient) {
    return children(getClient().variation(name, enabledByDefault));
  });
};

var _default = FeatureFlag;
exports.default = _default;