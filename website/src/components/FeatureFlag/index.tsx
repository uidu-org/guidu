import * as React from 'react';
import LDClient from 'ldclient-js';
import uuid from 'uuid/v4';
import {
  LAUNCH_DARKLY_LOCAL_KEY,
  LAUNCH_DARKLY_STAGING_KEY,
  LAUNCH_DARKLY_PRODUCTION_KEY,
} from '../../constants';

const clientKey = websiteEnv => {
  switch (websiteEnv) {
    case 'production':
      return LAUNCH_DARKLY_PRODUCTION_KEY;
    case 'staging':
      return LAUNCH_DARKLY_STAGING_KEY;
    default:
      return LAUNCH_DARKLY_LOCAL_KEY;
  }
};

const id = () => {
  try {
    const id = localStorage.getItem('atlaskit-website-ld-user-key') || uuid();
    localStorage.setItem('atlaskit-website-ld-user-key', id);
    return id;
  } catch (e) {
    // localStorage is not available just use a new id
    return uuid();
  }
};

const anonymousUser = () => ({
  key: id(),
  anonymous: true,
});

// This creates a getter that is passed down context. The advantage of a getter
// is that the client is only initialized when feature flags are needed, rather when
// this file is loaded.
const createClient = () => {
  let client;
  return () => {
    if (!client) {
      client = LDClient.initialize(clientKey(WEBSITE_ENV), anonymousUser(), {
        bootstrap: 'localStorage',
      });
    }
    return client;
  };
};

const { Consumer, Provider } = React.createContext(createClient());

export const LaunchDarklyClientProviderForTesting = Provider;

const FeatureFlag = ({ children, name, enabledByDefault = false }) => (
  <Consumer>
    {getClient => children(getClient().variation(name, enabledByDefault))}
  </Consumer>
);

export default FeatureFlag;
