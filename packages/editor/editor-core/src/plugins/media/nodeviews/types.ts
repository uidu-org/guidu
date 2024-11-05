import { MediaProvider, ProviderFactory } from '@uidu/editor-common';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { EventDispatcher } from '../../../event-dispatcher';
import { ProsemirrorGetPosHandler } from '../../../nodeviews';
import { MediaPluginState } from '../pm-plugins/types';
import { MediaOptions } from '../types';

export interface MediaSingleNodeProps {
  view: EditorView;
  node: PMNode;
  getPos: ProsemirrorGetPosHandler;
  eventDispatcher: EventDispatcher;
  width: number;
  selected: Function;
  lineLength: number;
  mediaOptions: MediaOptions;
  mediaProvider?: Promise<MediaProvider>;
  fullWidthMode?: boolean;
  mediaPluginState: MediaPluginState;
  isCopyPasteEnabled?: boolean;
}

export interface MediaSingleNodeViewProps {
  eventDispatcher: EventDispatcher;
  providerFactory: ProviderFactory;
  mediaOptions: MediaOptions;
  fullWidthMode?: boolean;
  isCopyPasteEnabled?: boolean;
}
