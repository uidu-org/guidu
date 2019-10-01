import { FabricChannel } from '@uidu/analytics-listeners';
import analyticsPlugin, { analyticsPluginKey as pluginKey } from './plugin';

export const analyticsEventKey = 'EDITOR_ANALYTICS_EVENT';
export const editorAnalyticsChannel = FabricChannel.editor;

export * from './types';
export * from './utils';

export const analyticsPluginKey = pluginKey;
export default analyticsPlugin;
