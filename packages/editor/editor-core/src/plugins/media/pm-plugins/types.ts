import { MediaSingleLayout } from '@uidu/adf-schema';
import { ContextIdentifierProvider, MediaProvider } from '@uidu/editor-common';
import { MediaClientConfig } from '@uidu/media-core';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { Dispatch } from '../../../event-dispatcher';
import { ProsemirrorGetPosHandler } from '../../../nodeviews';
import { MediaPluginOptions } from '../media-plugin-options';
import { MediaOptions, MediaState } from '../types';

export interface MediaNodeWithPosHandler {
  node: PMNode;
  getPos: ProsemirrorGetPosHandler;
}

export interface MediaPluginState {
  allowsUploads: boolean;
  mediaClientConfig?: MediaClientConfig;
  uploadMediaClientConfig?: MediaClientConfig;
  ignoreLinks: boolean;
  waitForMediaUpload: boolean;
  allUploadsFinished: boolean;
  showDropzone: boolean;
  element?: HTMLElement;
  layout: MediaSingleLayout;
  mediaNodes: MediaNodeWithPosHandler[];
  mediaGroupNodes: Record<string, any>;
  mobileUploadComplete: Record<string, boolean>;
  options: MediaPluginOptions;
  mediaProvider?: MediaProvider;
  pickers: [];
  pickerPromises: Array<Promise<any>>;
  editingMediaSinglePos?: number;
  showEditingDialog?: boolean;
  mediaOptions?: MediaOptions;
  dispatch?: Dispatch;
  onContextIdentifierProvider: (
    _name: string,
    provider?: Promise<ContextIdentifierProvider>,
  ) => Promise<void>;
  setMediaProvider: (mediaProvider?: Promise<MediaProvider>) => Promise<void>;
  getMediaOptions: () => MediaPluginOptions;
  // shouldUseMediaPickerPopup: () => boolean;
  insertFile: (mediaState: MediaState) => void;
  // addPendingTask: (promise: Promise<any>) => void;
  splitMediaGroup: () => boolean;
  onPopupPickerClose: () => void;
  showMediaPicker: () => void;
  // setBrowseFn: (browseFn: () => void) => void;
  onPopupToggle: (onPopupToogleCallback: (isOpen: boolean) => void) => void;
  // waitForPendingTasks: (
  //   timeout?: number,
  //   lastTask?: Promise<MediaState | null>,
  // ) => Promise<MediaState | null>;
  handleMediaNodeRemoval: (
    node: PMNode | undefined,
    getPos: ProsemirrorGetPosHandler,
  ) => void;
  handleMediaNodeMount: (
    node: PMNode,
    getPos: ProsemirrorGetPosHandler,
  ) => void;
  handleMediaNodeUnmount: (oldNode: PMNode) => void;
  findMediaNode: (id: string) => MediaNodeWithPosHandler | null;
  updateMediaNodeAttrs: (
    id: string,
    attrs: object,
    isMediaSingle: boolean,
  ) => undefined | boolean;
  // isMobileUploadCompleted: (mediaId: string) => boolean | undefined;
  removeNodeById: (state: MediaState) => void;
  removeSelectedMediaContainer: () => boolean;
  selectedMediaContainerNode: () => PMNode | undefined;
  handleDrag: (dragState: 'enter' | 'leave') => void;

  updateElement(): void;

  setView(view: EditorView): void;

  destroy(): void;

  trackNewMediaEvent(mediaState: MediaState): void;

  // updateAndDispatch(
  //   props: Partial<Pick<this, 'allowsUploads' | 'allUploadsFinished'>>,
  // ): void;
}
