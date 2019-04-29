import { MiddlewareAPI, Dispatch, Action } from 'redux';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { UIAnalyticsEventHandlerSignature } from '@atlaskit/analytics-next-types';

import { State } from '../domain';
import { version, name } from '../../../package.json';

import analyticsActionHandlers, { Payload } from './analyticsHandlers';

// TODO https://product-fabric.atlassian.net/browse/MS-598

const createAndFire = (
  payload: Payload,
  handlers: UIAnalyticsEventHandlerSignature[],
) => {
  new UIAnalyticsEvent({
    context: [{}],
    handlers,
    payload: {
      ...payload,
      attributes: {
        ...payload.attributes,
        componentName: 'mediaPicker',
        packageName: name,
        componentVersion: version,
      },
    },
  }).fire('media');
};

export default (store: MiddlewareAPI<State>) => (next: Dispatch<State>) => (
  action: Action,
) => {
  const proxyReactContext = store.getState().config.proxyReactContext;

  if (
    proxyReactContext &&
    proxyReactContext.getAtlaskitAnalyticsEventHandlers
  ) {
    const atlaskitAnalyticsEventHandlers = proxyReactContext.getAtlaskitAnalyticsEventHandlers();

    for (const handler of analyticsActionHandlers) {
      const payloads = handler(action, store) || [];
      payloads.forEach(payload =>
        createAndFire(payload, atlaskitAnalyticsEventHandlers),
      );
    }
  }

  return next(action);
};
