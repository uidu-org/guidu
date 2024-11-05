import { ErrorReporter, ErrorReportingHandler } from '@uidu/editor-common';
import { MarkSpec } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { AnalyticsHandler, analyticsService } from '../analytics';
import {
  EditorConfig,
  EditorPlugin,
  PluginsOptions,
  PMPluginCreateConfig,
} from '../types';
import { name, version } from '../version-wrapper';
import { sortByOrder } from './sort-by-order';

export function sortByRank(a: { rank: number }, b: { rank: number }): number {
  return a.rank - b.rank;
}

export function fixExcludes(marks: { [key: string]: MarkSpec }): {
  [key: string]: MarkSpec;
} {
  const markKeys = Object.keys(marks);
  const markGroups = new Set(markKeys.map((mark) => marks[mark].group));

  markKeys.forEach((markKey) => {
    const mark = marks[markKey];
    if (mark.excludes) {
      mark.excludes = mark.excludes
        .split(' ')
        .filter((group) => markGroups.has(group))
        .join(' ');
    }
  });
  return marks;
}

export function processPluginsList(plugins: EditorPlugin[]): EditorConfig {
  /**
   * First pass to collect pluginsOptions
   */
  const pluginsOptions = plugins.reduce<PluginsOptions>((acc, plugin) => {
    if (plugin.pluginsOptions) {
      Object.keys(plugin.pluginsOptions).forEach((pluginName) => {
        if (!acc[pluginName]) {
          acc[pluginName] = [];
        }
        acc[pluginName].push(plugin.pluginsOptions[pluginName]);
      });
    }

    return acc;
  }, {});

  /**
   * Process plugins
   */
  return plugins.reduce<EditorConfig>(
    (acc, plugin) => {
      if (plugin.pmPlugins) {
        acc.pmPlugins.push(
          ...plugin.pmPlugins(
            plugin.name ? pluginsOptions[plugin.name] : undefined,
          ),
        );
      }

      if (plugin.nodes) {
        acc.nodes.push(...plugin.nodes());
      }

      if (plugin.marks) {
        acc.marks.push(...plugin.marks());
      }

      if (plugin.contentComponent) {
        acc.contentComponents.push(plugin.contentComponent);
      }

      if (plugin.primaryToolbarComponent) {
        acc.primaryToolbarComponents.push(plugin.primaryToolbarComponent);
      }

      if (plugin.secondaryToolbarComponent) {
        acc.secondaryToolbarComponents.push(plugin.secondaryToolbarComponent);
      }

      if (plugin.onEditorViewStateUpdated) {
        acc.onEditorViewStateUpdatedCallbacks.push({
          pluginName: plugin.name,
          callback: plugin.onEditorViewStateUpdated,
        });
      }

      return acc;
    },
    {
      nodes: [],
      marks: [],
      pmPlugins: [],
      contentComponents: [],
      primaryToolbarComponents: [],
      secondaryToolbarComponents: [],
      onEditorViewStateUpdatedCallbacks: [],
    },
  );
}

export function createPMPlugins(config: PMPluginCreateConfig): Plugin[] {
  const { editorConfig, ...rest } = config;
  return editorConfig.pmPlugins
    .sort(sortByOrder('plugins'))
    .map(({ plugin }) => plugin(rest))
    .filter((plugin): plugin is Plugin => typeof plugin !== 'undefined');
}

export function createErrorReporter(
  errorReporterHandler?: ErrorReportingHandler,
) {
  const errorReporter = new ErrorReporter();
  if (errorReporterHandler) {
    errorReporter.handler = errorReporterHandler;
  }
  return errorReporter;
}

export function initAnalytics(analyticsHandler?: AnalyticsHandler) {
  analyticsService.handler = analyticsHandler || (() => {});
  analyticsService.trackEvent('uidu.editor-core.start', {
    name,
    version,
  });
}
