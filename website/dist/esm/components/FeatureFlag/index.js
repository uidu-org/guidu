import React from 'react';
import LDClient from 'ldclient-js';
import uuid from 'uuid/v4';
import { LAUNCH_DARKLY_LOCAL_KEY, LAUNCH_DARKLY_STAGING_KEY, LAUNCH_DARKLY_PRODUCTION_KEY } from '../../constants';

var clientKey = function clientKey(websiteEnv) {
  switch (websiteEnv) {
    case 'production':
      return LAUNCH_DARKLY_PRODUCTION_KEY;

    case 'staging':
      return LAUNCH_DARKLY_STAGING_KEY;

    default:
      return LAUNCH_DARKLY_LOCAL_KEY;
  }
};

var id = function id() {
  try {
    var _id = localStorage.getItem('atlaskit-website-ld-user-key');

    if (_id === null) {
      _id = uuid();
      localStorage.setItem('atlaskit-website-ld-user-key', _id);
    }

    return _id;
  } catch (e) {
    // localStorage is not available just use a new id
    return uuid();
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
      client = LDClient.initialize(clientKey('development'), anonymousUser(), {
        bootstrap: 'localStorage'
      });
    }

    return client;
  };
};

var _React$createContext = React.createContext(createClient()),
    Consumer = _React$createContext.Consumer,
    Provider = _React$createContext.Provider;

export var LaunchDarklyClientProviderForTesting = Provider;

var FeatureFlag = function FeatureFlag(_ref) {
  var children = _ref.children,
      name = _ref.name,
      _ref$enabledByDefault = _ref.enabledByDefault,
      enabledByDefault = _ref$enabledByDefault === void 0 ? false : _ref$enabledByDefault;
  return React.createElement(Consumer, null, function (getClient) {
    return children(getClient().variation(name, enabledByDefault));
  });
};

export default FeatureFlag;