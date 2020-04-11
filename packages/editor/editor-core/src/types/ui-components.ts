import { ProviderFactory } from '@uidu/editor-common/provider-factory';
import { EditorView } from 'prosemirror-view';
import React from 'react';
import EditorActions from '../actions';
import { EventDispatcher } from '../event-dispatcher';
import { DispatchAnalyticsEvent } from '../plugins/analytics/types/dispatch-analytics-event';
import { EditorAppearance } from './editor-appearance';

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
  containerElement: HTMLElement | null;
  disabled: boolean;
};
export type UIComponentFactory = (
  params: UiComponentFactoryParams,
) => React.ReactElement<any> | null;
