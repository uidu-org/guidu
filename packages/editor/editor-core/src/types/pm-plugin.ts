import { ErrorReporter, ProviderFactory } from '@uidu/editor-common';
import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { Dispatch, EventDispatcher } from '../event-dispatcher';
import { PortalProviderAPI } from '../ui/PortalProvider';
// TODO: Check if this circular dependency is still needed or is just legacy
// eslint-disable-next-line import/no-cycle
import { EditorConfig } from './editor-config';

export type PMPluginFactoryParams = {
  schema: Schema;
  dispatch: Dispatch;
  eventDispatcher: EventDispatcher;
  providerFactory: ProviderFactory;
  errorReporter?: ErrorReporter;
  portalProviderAPI: PortalProviderAPI;
  reactContext: () => { [key: string]: any };
};
export type PMPluginCreateConfig = PMPluginFactoryParams & {
  editorConfig: EditorConfig;
};
export type PMPluginFactory = (
  params: PMPluginFactoryParams,
) => Plugin | undefined;
export type PMPlugin = {
  name: string;
  plugin: PMPluginFactory;
};
