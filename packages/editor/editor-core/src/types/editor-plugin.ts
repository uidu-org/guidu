import { ErrorReporter, ProviderFactory } from '@uidu/editor-common';
import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { IntlShape } from 'react-intl';
import EditorActions from '../actions';
import { Dispatch, EventDispatcher } from '../event-dispatcher';
import { DispatchAnalyticsEvent } from '../plugins/analytics';
import { FloatingToolbarHandler } from '../plugins/floating-toolbar/types';
import { QuickInsertHandler } from '../plugins/quick-insert/types';
import { TypeAheadHandler } from '../plugins/type-ahead/types';
import { PortalProviderAPI } from '../ui/PortalProvider';
import { ToolbarSize } from '../ui/Toolbar';
import { EditorConfig, MarkConfig, NodeConfig } from './editor-config';
import { EditorAppearance, EditorProps } from './editor-props';

export type PMPluginFactoryParams = {
  schema: Schema;
  props: EditorProps;
  prevProps?: EditorProps;
  dispatch: Dispatch;
  eventDispatcher: EventDispatcher;
  providerFactory: ProviderFactory;
  errorReporter?: ErrorReporter;
  portalProviderAPI: PortalProviderAPI;
  reactContext: () => { [key: string]: any };
  intl: IntlShape;
  dispatchAnalyticsEvent: DispatchAnalyticsEvent;
};

export type PMPluginCreateConfig = PMPluginFactoryParams & {
  editorConfig: EditorConfig;
};

export type PMPluginFactory = (
  params: PMPluginFactoryParams,
) => Plugin | undefined;

export type UiComponentFactoryParams = {
  editorView: EditorView;
  editorActions: EditorActions;
  eventDispatcher: EventDispatcher;
  dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
  providerFactory: ProviderFactory;
  appearance: EditorAppearance;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  containerElement: HTMLElement | undefined;
  disabled: boolean;
};

export type ToolbarUiComponentFactoryParams = UiComponentFactoryParams & {
  toolbarSize: ToolbarSize;
  isToolbarReducedSpacing: boolean;
};

export type UIComponentFactory = (
  params: UiComponentFactoryParams,
) => React.ReactElement<any> | null;

export type ToolbarUIComponentFactory = (
  params: ToolbarUiComponentFactoryParams,
) => React.ReactElement<any> | null;

export type PluginsOptions = {
  [pluginName: string]: any;
  quickInsert?: QuickInsertHandler;
  typeAhead?: TypeAheadHandler;
  floatingToolbar?: FloatingToolbarHandler;
};

export type PMPlugin = {
  name: string;
  plugin: PMPluginFactory;
};

export interface EditorPlugin {
  /**
   * Name of a plugin, that other plugins can use to provide options to it or exclude via a preset.
   */
  name: string;

  /**
   * Options that will be passed to a plugin with a corresponding name if it exists and enabled.
   */
  pluginsOptions?: PluginsOptions;

  /**
   * List of ProseMirror-plugins. This is where we define which plugins will be added to EditorView (main-plugin, keybindings, input-rules, etc.).
   */
  pmPlugins?: (pluginOptions?: any) => Array<PMPlugin>;

  /**
   * List of Nodes to add to the schema.
   */
  nodes?: (editorProps: EditorProps) => NodeConfig[];

  /**
   * List of Marks to add to the schema.
   */
  marks?: (editorProps: EditorProps) => MarkConfig[];

  /**
   * Optional UI-component that lives inside the actual content-area (like mention-picker, floating toolbar for links, etc.)
   */
  contentComponent?: UIComponentFactory;

  /**
   * Optional UI-component that will be added to the toolbar at the top of the editor (doesn't exist in the compact-editor).
   */
  primaryToolbarComponent?: ToolbarUIComponentFactory;

  /**
   * Optional UI-component that will be added to the toolbar at the bottom right of the editor. (doesn't exist in the full-page editor)
   * In compact mode this toolbar lives on the right-hand side of the editor.
   */
  secondaryToolbarComponent?: UIComponentFactory;
}
