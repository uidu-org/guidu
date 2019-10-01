import { EditorPlugin } from '../../../types';
import { EditorPresetProps } from './types';

export const removeExcludes = (
  plugins: EditorPlugin[],
  excludes: EditorPresetProps['excludes'],
) => {
  if (excludes) {
    return plugins.filter(plugin => excludes.indexOf(plugin.name) === -1);
  }
  return plugins;
};

export type ExperimentalPluginMap = Map<string, EditorPlugin>;
export const enableExperimental = (
  plugins: EditorPlugin[],
  experimental: EditorPresetProps['experimental'],
  experimentalPluginMap: ExperimentalPluginMap,
) => {
  if (experimental && experimental.length) {
    experimental.map(pluginName => {
      const plugin = experimentalPluginMap.get(pluginName);
      if (plugin) {
        plugins.push(plugin);
      }
    });
  }

  return plugins;
};
