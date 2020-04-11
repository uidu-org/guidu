import { ExtensionHandlers, ProviderFactory } from '@uidu/editor-common';
import { EditorView } from 'prosemirror-view';
import EditorActions from '../actions';
import { EventDispatcher } from '../event-dispatcher';
import { DispatchAnalyticsEvent } from '../plugins/analytics';
import { CollabEditOptions } from '../plugins/collab-edit/types';
import { ReactComponents } from '../types/editor-props';
import { UIComponentFactory } from '../types/ui-components';
import { MenuItem } from '../ui/DropdownMenu/types';
import { ToolbarUIComponentFactory } from '../ui/Toolbar/types';
import { EditorAppearance } from './editor-appearance';

export interface EditorAppearanceComponentProps {
  appearance?: EditorAppearance;
  onSave?: (editorView: EditorView) => void;
  onCancel?: (editorView: EditorView) => void;

  providerFactory: ProviderFactory;
  editorActions?: EditorActions;
  editorDOMElement: JSX.Element;
  editorView?: EditorView;

  eventDispatcher?: EventDispatcher;
  dispatchAnalyticsEvent?: DispatchAnalyticsEvent;

  maxHeight?: number;

  contentComponents?: UIComponentFactory[];
  primaryToolbarComponents?: ToolbarUIComponentFactory[];
  secondaryToolbarComponents?: UIComponentFactory[];

  customContentComponents?: ReactComponents;
  customPrimaryToolbarComponents?: ReactComponents;
  customSecondaryToolbarComponents?: ReactComponents;
  insertMenuItems?: MenuItem[];
  contextPanel?: ReactComponents;

  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;

  extensionHandlers?: ExtensionHandlers;

  disabled?: boolean;

  collabEdit?: CollabEditOptions;

  allowDynamicTextSizing?: boolean;
  allowAnnotation?: boolean;
}
