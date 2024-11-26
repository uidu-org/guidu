import { ProviderFactory } from '@uidu/editor-common/provider-factory';
import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { Dispatch, EventDispatcher } from '../event-dispatcher';
import { MarkConfig, NodeConfig } from '../types/pm-config';

export type LightPMPluginFactoryParams = {
  // We can type this safe, we already remove the real code from this types
  schema: Schema;
  dispatch: Dispatch;
  eventDispatcher: EventDispatcher;
  providerFactory: ProviderFactory;
  // We dont use this for now
  props: {};
  prevProps?: {};
  portalProviderAPI: any;
  reactContext: () => { [key: string]: any };
};
export type LightPMPluginFactory = (
  params: LightPMPluginFactoryParams,
) => Plugin | undefined;
export type LightPMPlugin = {
  name: string;
  plugin: LightPMPluginFactory;
};

export interface LightEditorPlugin {
  name: string;
  marks?: () => MarkConfig[];
  nodes?: () => NodeConfig[];
  pmPlugins?: (pluginOptions?: any) => Array<LightPMPlugin>;
  pluginsOptions?: Record<string, any>;
}
