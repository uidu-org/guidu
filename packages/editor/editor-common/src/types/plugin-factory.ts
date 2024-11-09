import type { Schema } from 'prosemirror-model';
import type { IntlShape } from 'react-intl';

import type { Dispatch, EventDispatcher } from '../event-dispatcher';
import type { ProviderFactory } from '../provider-factory';
import type { SafePlugin } from '../safe-plugin';
import type { ErrorReporter } from '../utils';

import type { EditorReactContext } from './editor-react-context';
import type { FeatureFlags } from './feature-flags';

export type PMPluginFactoryParams = {
  schema: Schema;
  dispatch: Dispatch;
  eventDispatcher: EventDispatcher;
  providerFactory: ProviderFactory;
  errorReporter?: ErrorReporter;
  reactContext: () => EditorReactContext;
  featureFlags: FeatureFlags;
  getIntl: () => IntlShape;
};

export type PMPluginFactory = (
  params: PMPluginFactoryParams,
) => SafePlugin | undefined;
export type PMPlugin = {
  name: string;
  plugin: PMPluginFactory;
};
