import type React from 'react';

import type { EditorView } from 'prosemirror-view';

import type { EventDispatcher } from '../event-dispatcher';
import type { ProviderFactory } from '../provider-factory';

import type { EditorActionsOptions } from './editor-actions';
import type { EditorAppearance } from './editor-appearance';

export type UiComponentFactoryParams = {
  editorView: EditorView;
  editorActions: EditorActionsOptions;
  eventDispatcher: EventDispatcher;
  providerFactory: ProviderFactory;
  appearance: EditorAppearance;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  containerElement: HTMLElement | null;
  disabled: boolean;
  wrapperElement: HTMLElement | null;
};
export type UIComponentFactory = (
  params: UiComponentFactoryParams,
) => React.ReactElement<any> | null;
