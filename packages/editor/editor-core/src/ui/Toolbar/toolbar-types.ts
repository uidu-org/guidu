import { ProviderFactory } from '@uidu/editor-common';
import { EditorView } from 'prosemirror-view';
import EditorActions from '../../actions';
import { EventDispatcher } from '../../event-dispatcher';
import { DispatchAnalyticsEvent } from '../../plugins/analytics';
import { EditorAppearance } from '../../types/editor-appearance';
import { ToolbarSize, ToolbarUIComponentFactory } from './types';

export interface ToolbarBreakPoint {
  width: number;
  size: ToolbarSize;
}

export interface ToolbarProps {
  items?: Array<ToolbarUIComponentFactory>;
  editorView: EditorView;
  editorActions?: EditorActions;
  eventDispatcher: EventDispatcher;
  providerFactory: ProviderFactory;
  appearance?: EditorAppearance;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  disabled: boolean;
  dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
  toolbarSize: ToolbarSize;
}

export type ToolbarWithSizeDetectorProps = Omit<ToolbarProps, 'toolbarSize'>;

export interface ToolbarInnerProps extends ToolbarProps {
  isToolbarReducedSpacing: boolean;
  isReducedSpacing?: boolean;
}
