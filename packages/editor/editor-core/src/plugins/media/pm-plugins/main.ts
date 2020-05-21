import { MediaSingleLayout } from '@uidu/adf-schema';
import {
  ContextIdentifierProvider,
  ErrorReporter,
  MediaProvider,
} from '@uidu/editor-common';
import { MediaClientConfig } from '@uidu/media-core';
import { MediaPickerFactoryClass } from '@uidu/media-picker';
import assert from 'assert';
import { Node, Node as PMNode, Schema } from 'prosemirror-model';
import { EditorState, NodeSelection, Plugin } from 'prosemirror-state';
import { insertPoint } from 'prosemirror-transform';
import { findDomRefAtPos } from 'prosemirror-utils';
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view';
import React from 'react';
import ReactDOM from 'react-dom';
import analyticsService from '../../../analytics/service';
import { Dispatch } from '../../../event-dispatcher';
import { ProsemirrorGetPosHandler } from '../../../nodeviews';
import {
  InputMethodInsertMedia,
  INPUT_METHOD,
} from '../../../plugins/analytics';
import { updateMediaNodeAttrs } from '../commands';
import * as helpers from '../commands/helpers';
import { MediaPluginOptions } from '../media-plugin-options';
// import PickerFacade, {
//   MediaStateEventListener,
//   MediaStateEventSubscriber,
//   PickerFacadeConfig,
// } from '../picker-facade';
import { MediaOptions, MediaState } from '../types';
import DropPlaceholder, { PlaceholderType } from '../ui/Media/DropPlaceholder';
import { isImage } from '../utils/is-image';
import { removeMediaNode, splitMediaGroup } from '../utils/media-common';
import { insertMediaGroupNode } from '../utils/media-files';
import { insertMediaSingleNode } from '../utils/media-single';
import { stateKey } from './plugin-key';
import { MediaNodeWithPosHandler, MediaPluginState } from './types';

export { stateKey } from './plugin-key';
export { MediaState, MediaProvider };

const createDropPlaceholder = (allowDropLine?: boolean) => {
  const dropPlaceholder = document.createElement('div');
  if (allowDropLine) {
    ReactDOM.render(
      React.createElement(DropPlaceholder, { type: 'single' } as {
        type: PlaceholderType;
      }),
      dropPlaceholder,
    );
  } else {
    ReactDOM.render(React.createElement(DropPlaceholder), dropPlaceholder);
  }
  return dropPlaceholder;
};

const MEDIA_RESOLVED_STATES = ['ready', 'error', 'cancelled'];

export class MediaPluginStateImplementation implements MediaPluginState {
  allowsUploads: boolean = false;
  mediaClientConfig?: MediaClientConfig;
  uploadMediaClientConfig?: MediaClientConfig;
  ignoreLinks: boolean = false;
  waitForMediaUpload: boolean = true;
  allUploadsFinished: boolean = true;
  showDropzone: boolean = false;
  element?: HTMLElement;
  layout: MediaSingleLayout = 'center';
  mediaNodes: MediaNodeWithPosHandler[] = [];
  mediaGroupNodes: Record<string, any> = {};
  mobileUploadComplete: Record<string, boolean> = {};
  options: MediaPluginOptions;
  mediaProvider?: MediaProvider;

  private pendingTask = Promise.resolve<MediaState | null>(null);
  private view!: EditorView;
  private destroyed = false;
  private contextIdentifierProvider?: ContextIdentifierProvider;
  private errorReporter: ErrorReporter;
  private popupPicker?: any;
  // @ts-ignore
  private customPicker?: any;
  private removeOnCloseListener: () => void = () => {};
  private openMediaPickerBrowser?: () => void;
  private onPopupToogleCallback: (isOpen: boolean) => void = () => {};
  private reactContext: () => {};

  pickers: [] = [];
  pickerPromises: Array<Promise<any>> = [];

  editingMediaSinglePos?: number;
  showEditingDialog?: boolean;
  mediaOptions?: MediaOptions;
  dispatch?: Dispatch;

  constructor(
    state: EditorState,
    options: MediaPluginOptions,
    reactContext: () => {},
    mediaOptions?: MediaOptions,
    dispatch?: Dispatch,
  ) {
    this.reactContext = reactContext;
    this.options = options;
    this.mediaOptions = mediaOptions;
    this.dispatch = dispatch;
    this.waitForMediaUpload =
      options.waitForMediaUpload === undefined
        ? true
        : options.waitForMediaUpload;

    const { nodes } = state.schema;
    assert(
      nodes.media && (nodes.mediaGroup || nodes.mediaSingle),
      'Editor: unable to init media plugin - media or mediaGroup/mediaSingle node absent in schema',
    );

    options.providerFactory.subscribe(
      'mediaProvider',
      (_name: string, provider?: Promise<MediaProvider>) =>
        this.setMediaProvider(provider),
    );

    options.providerFactory.subscribe(
      'contextIdentifierProvider',
      this.onContextIdentifierProvider,
    );

    this.errorReporter = options.errorReporter || new ErrorReporter();
  }

  onContextIdentifierProvider = async (
    _name: string,
    provider?: Promise<ContextIdentifierProvider>,
  ) => {
    if (provider) {
      this.contextIdentifierProvider = await provider;
    }
  };

  setMediaProvider = async (mediaProvider?: Promise<MediaProvider>) => {
    if (!mediaProvider) {
      this.destroyPickers();

      this.allowsUploads = false;
      if (!this.destroyed) {
        this.view.dispatch(
          this.view.state.tr.setMeta(stateKey, {
            allowsUploads: this.allowsUploads,
          }),
        );
      }

      return undefined;
    }

    // TODO disable (not destroy!) pickers until mediaProvider is resolved
    try {
      this.mediaProvider = await mediaProvider;

      if (!this.mediaProvider.viewMediaClientConfig) {
        const viewMediaClientConfig = this.mediaProvider.viewMediaClientConfig;

        if (viewMediaClientConfig) {
          (this
            .mediaProvider as MediaProvider).viewMediaClientConfig = viewMediaClientConfig;
        }
      }

      if (!this.mediaProvider.uploadMediaClientConfig) {
        this.mediaProvider.uploadMediaClientConfig = this.mediaProvider.uploadMediaClientConfig;
      }
      assert(
        this.mediaProvider.viewMediaClientConfig,
        `MediaProvider promise did not resolve to a valid instance of MediaProvider - ${this.mediaProvider}`,
      );
    } catch (err) {
      const wrappedError = new Error(
        `Media functionality disabled due to rejected provider: ${err.message}`,
      );
      this.errorReporter.captureException(wrappedError);

      this.destroyPickers();

      this.allowsUploads = false;
      if (!this.destroyed) {
        this.view.dispatch(
          this.view.state.tr.setMeta(stateKey, {
            allowsUploads: this.allowsUploads,
          }),
        );
      }

      return undefined;
    }

    this.mediaClientConfig = this.mediaProvider.viewMediaClientConfig;

    this.allowsUploads = !!this.mediaProvider.uploadMediaClientConfig;
    const { view, allowsUploads } = this;

    // make sure editable DOM node is mounted
    if (!this.destroyed && view.dom.parentNode) {
      // make PM plugin aware of the state change to update UI during 'apply' hook
      view.dispatch(view.state.tr.setMeta(stateKey, { allowsUploads }));
    }

    if (this.allowsUploads) {
      this.uploadMediaClientConfig = this.mediaProvider.uploadMediaClientConfig;
      if (this.mediaProvider.uploadOptions) {
        await this.initPickers(
          this.mediaProvider.uploadOptions,
          this.reactContext,
        );
      } else {
        this.destroyPickers();
      }
    } else {
      this.destroyPickers();
    }
  };

  getMediaOptions = () => this.options;

  updateElement(): void {
    let newElement;
    const selectedContainer = this.selectedMediaContainerNode();
    const { mediaSingle } = this.view.state.schema.nodes;

    if (selectedContainer && selectedContainer.type === mediaSingle) {
      newElement = this.getDomElement(this.view.domAtPos.bind(this.view)) as
        | HTMLElement
        | undefined;
    }
    if (this.element !== newElement) {
      this.element = newElement;
    }
  }

  private getDomElement(domAtPos: EditorView['domAtPos']) {
    const { selection, schema } = this.view.state;
    if (!(selection instanceof NodeSelection)) {
      return undefined;
    }

    if (selection.node.type !== schema.nodes.mediaSingle) {
      return undefined;
    }

    const node = findDomRefAtPos(selection.from, domAtPos);
    if (node) {
      if (!node.childNodes.length) {
        return node.parentNode as HTMLElement | undefined;
      }

      const target = (node as HTMLElement).querySelector('.wrapper') || node;
      return target;
    }
    return undefined;
  }

  /**
   * we insert a new file by inserting a initial state for that file.
   *
   * called when we insert a new file via the picker (connected via pickerfacade)
   */
  insertFile = (files) => {
    this.allUploadsFinished = true;

    console.log(files);

    if (files.length === 1) {
      insertMediaSingleNode(this.view, files[0]);
    } else {
      insertMediaGroupNode(this.view, files);
    }

    // refocus the view
    const { view } = this;
    if (!view.hasFocus()) {
      view.focus();
    }
  };

  splitMediaGroup = (): boolean => splitMediaGroup(this.view);

  // TODO [MSW-454]: remove this logic from Editor
  onPopupPickerClose = () => {
    this.onPopupToogleCallback(false);
  };

  showMediaPicker = () => {
    if (!this.popupPicker) {
      return undefined;
    }
    this.popupPicker.show();
    this.onPopupToogleCallback(true);
  };

  onPopupToggle = (onPopupToogleCallback: (isOpen: boolean) => void) => {
    this.onPopupToogleCallback = onPopupToogleCallback;
  };

  setView(view: EditorView) {
    this.view = view;
  }

  /**
   * Called from React UI Component when user clicks on "Delete" icon
   * inside of it
   */
  handleMediaNodeRemoval = (node: PMNode, getPos: ProsemirrorGetPosHandler) => {
    let getNode = node;
    if (!getNode) {
      getNode = this.view.state.doc.nodeAt(getPos()) as PMNode;
    }
    removeMediaNode(this.view, getNode, getPos);
  };

  /**
   * Called from React UI Component on componentDidMount
   */
  handleMediaNodeMount = (node: PMNode, getPos: ProsemirrorGetPosHandler) => {
    this.mediaNodes.unshift({ node, getPos });
  };

  /**
   * Called from React UI Component on componentWillUnmount and componentWillReceiveProps
   * when React component's underlying node property is replaced with a new node
   */
  handleMediaNodeUnmount = (oldNode: PMNode) => {
    this.mediaNodes = this.mediaNodes.filter(({ node }) => oldNode !== node);
  };

  destroy() {
    if (this.destroyed) {
      return undefined;
    }

    this.destroyed = true;

    const { mediaNodes } = this;
    mediaNodes.splice(0, mediaNodes.length);

    this.removeOnCloseListener();
    this.destroyPickers();
  }

  findMediaNode = (id: string): MediaNodeWithPosHandler | null => {
    return helpers.findMediaSingleNode(this, id);
  };

  private destroyAllPickers = (pickers: Array<any>) => {
    // pickers.forEach((picker) => picker.destroy());
    this.pickers.splice(0, this.pickers.length);
  };

  private destroyPickers = () => {
    const { pickers, pickerPromises } = this;

    // If pickerPromises and pickers are the same length
    // All pickers have resolved and we safely destroy them
    // Otherwise wait for them to resolve then destroy.
    if (pickerPromises.length === pickers.length) {
      this.destroyAllPickers(this.pickers);
    } else {
      Promise.all(pickerPromises).then((resolvedPickers) =>
        this.destroyAllPickers(resolvedPickers),
      );
    }

    this.popupPicker = null;
    this.customPicker = undefined;
  };

  private async initPickers(uploadOptions: any, reactContext: () => {}) {
    if (this.destroyed) {
      return undefined;
    }
    const { errorReporter, pickers, pickerPromises } = this;

    // create pickers if they don't exist, re-use otherwise
    if (!pickers.length) {
      const popupPicker = MediaPickerFactoryClass({
        proxyReactContext: reactContext(),
        uploadOptions,
        onComplete: (result) => {
          this.insertFile(
            result.successful.map(({ response }) => response.body),
          );
        },
        // onClose: () => this.onPopupPickerClose(),
      });
      pickerPromises.push(popupPicker);
      // @ts-ignore
      pickers.push((this.popupPicker = await popupPicker));
    }
  }

  public trackNewMediaEvent(mediaState: MediaState) {
    return analyticsService.trackEvent(
      `atlassian.editor.media.file`,
      mediaState.metadata.mime_type
        ? { fileMimeType: mediaState.metadata.mime_type }
        : {},
    );
  }

  private getInputMethod = (
    pickerType: string,
  ): InputMethodInsertMedia | undefined => {
    switch (pickerType) {
      case 'popup':
        return INPUT_METHOD.PICKER_CLOUD;
      case 'clipboard':
        return INPUT_METHOD.CLIPBOARD;
      case 'dropzone':
        return INPUT_METHOD.DRAG_AND_DROP;
    }
    return undefined;
  };

  updateMediaNodeAttrs = (
    id: string,
    attrs: object,
    isMediaSingle: boolean,
  ) => {
    const { view } = this;
    if (!view) {
      return undefined;
    }

    return updateMediaNodeAttrs(
      id,
      attrs,
      isMediaSingle,
    )(view.state, view.dispatch);
  };

  removeNodeById = (state: MediaState) => {
    const { id } = state;
    const mediaNodeWithPos = helpers.findMediaNode(
      this,
      id,
      isImage(state.metadata.mime_type),
    );

    if (mediaNodeWithPos) {
      removeMediaNode(
        this.view,
        mediaNodeWithPos.node,
        mediaNodeWithPos.getPos,
      );
    }
  };

  removeSelectedMediaContainer = (): boolean => {
    const { view } = this;

    const selectedNode = this.selectedMediaContainerNode();
    if (!selectedNode) {
      return false;
    }

    let { from } = view.state.selection;
    removeMediaNode(view, selectedNode.firstChild!, () => from + 1);
    return true;
  };

  selectedMediaContainerNode = (): Node | undefined => {
    const { selection, schema } = this.view.state;
    if (
      selection instanceof NodeSelection &&
      (selection.node.type === schema.nodes.mediaSingle ||
        selection.node.type === schema.nodes.mediaGroup)
    ) {
      return selection.node;
    }
    return undefined;
  };

  handleDrag = (dragState: 'enter' | 'leave') => {
    const isActive = dragState === 'enter';
    if (this.showDropzone === isActive) {
      return undefined;
    }
    this.showDropzone = isActive;

    const { dispatch, state } = this.view;
    // Trigger state change to be able to pick it up in the decorations handler
    dispatch(state.tr);
  };
}

export const getMediaPluginState = (state: EditorState) =>
  stateKey.getState(state) as MediaPluginState;

export const createPlugin = (
  _schema: Schema,
  options: MediaPluginOptions,
  reactContext: () => {},
  dispatch?: Dispatch,
  mediaOptions?: MediaOptions,
) => {
  const dropPlaceholder = createDropPlaceholder(
    mediaOptions && mediaOptions.allowDropzoneDropLine,
  );

  return new Plugin({
    state: {
      init(_config, state) {
        return new MediaPluginStateImplementation(
          state,
          options,
          reactContext,
          mediaOptions,
          dispatch,
        );
      },
      apply(tr, pluginState: MediaPluginState) {
        // remap editing media single position if we're in collab
        if (typeof pluginState.editingMediaSinglePos === 'number') {
          pluginState.editingMediaSinglePos = tr.mapping.map(
            pluginState.editingMediaSinglePos,
          );
        }

        const meta = tr.getMeta(stateKey);
        if (meta && dispatch) {
          const { showMediaPicker } = pluginState;
          const { allowsUploads } = meta;
          dispatch(stateKey, {
            ...pluginState,
            allowsUploads:
              typeof allowsUploads === 'undefined'
                ? pluginState.allowsUploads
                : allowsUploads,
            showMediaPicker,
          });
        }

        // NOTE: We're not calling passing new state to the Editor, because we depend on the view.state reference
        //       throughout the lifetime of view. We injected the view into the plugin state, because we dispatch()
        //       transformations from within the plugin state (i.e. when adding a new file).
        return pluginState;
      },
    },
    key: stateKey,
    view: (view) => {
      const pluginState = getMediaPluginState(view.state);
      pluginState.setView(view);
      pluginState.updateElement();

      return {
        update: () => {
          pluginState.updateElement();
        },
      };
    },
    props: {
      decorations: (state) => {
        const pluginState = getMediaPluginState(state);
        if (!pluginState.showDropzone) {
          return undefined;
        }

        const {
          schema,
          selection: { $anchor },
        } = state;

        // When a media is already selected
        if (state.selection instanceof NodeSelection) {
          const node = state.selection.node;

          if (node.type === schema.nodes.mediaSingle) {
            const deco = Decoration.node(
              state.selection.from,
              state.selection.to,
              {
                class: 'mediaSingle-selected',
              },
            );

            return DecorationSet.create(state.doc, [deco]);
          }

          return undefined;
        }

        let pos: number | null | void = $anchor.pos;
        if (
          $anchor.parent.type !== schema.nodes.paragraph &&
          $anchor.parent.type !== schema.nodes.codeBlock
        ) {
          pos = insertPoint(state.doc, pos, schema.nodes.mediaGroup);
        }

        if (pos === null || pos === undefined) {
          return undefined;
        }

        const dropPlaceholders: Decoration[] = [
          Decoration.widget(pos, dropPlaceholder, {
            key: 'drop-placeholder',
          }),
        ];
        return DecorationSet.create(state.doc, dropPlaceholders);
      },
      nodeViews: options.nodeViews,
      handleTextInput(view: EditorView): boolean {
        getMediaPluginState(view.state).splitMediaGroup();
        return false;
      },
    },
  });
};
