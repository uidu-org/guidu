import { MediaSingleLayout } from '@atlaskit/adf-schema';
import { UploadParams } from '@atlaskit/media-picker';
import { ErrorReporter } from '@uidu/editor-common';
import assert from 'assert';
import { Node, Node as PMNode, Schema } from 'prosemirror-model';
import { EditorState, NodeSelection, Plugin, PluginKey } from 'prosemirror-state';
import { insertPoint } from 'prosemirror-transform';
import { findDomRefAtPos } from 'prosemirror-utils';
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import analyticsService from '../../../analytics/service';
import { Dispatch } from '../../../event-dispatcher';
import { ProsemirrorGetPosHandler } from '../../../nodeviews';
import { ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID, AnalyticsEventPayload, DispatchAnalyticsEvent, EVENT_TYPE, InputMethodInsertMedia, INPUT_METHOD } from '../../../plugins/analytics';
import { EditorAppearance } from '../../../types/editor-props';
import { isImage } from '../../../utils';
import { isFullPage } from '../../../utils/is-full-page';
import { updateMediaNodeAttrs } from '../commands';
import * as helpers from '../commands/helpers';
import { MediaPluginOptions } from '../media-plugin-options';
import PickerFacade, { MediaStateEventListener, MediaStateEventSubscriber, PickerFacadeConfig } from '../picker-facade';
import { MediaProvider, MediaState, MediaStateStatus } from '../types';
import DropPlaceholder, { PlaceholderType } from '../ui/Media/DropPlaceholder';
import { removeMediaNode, splitMediaGroup } from '../utils/media-common';
import { insertMediaGroupNode } from '../utils/media-files';
import { insertMediaSingleNode, isMediaSingle } from '../utils/media-single';



export { MediaState, MediaProvider, MediaStateStatus };

const MEDIA_RESOLVED_STATES = ['ready', 'error', 'cancelled'];

export interface MediaNodeWithPosHandler {
  node: PMNode;
  getPos: ProsemirrorGetPosHandler;
}

export class MediaPluginState {
  public allowsUploads: boolean = false;
  public mediaContext?: Context;
  public uploadContext?: Context;
  public ignoreLinks: boolean = false;
  public waitForMediaUpload: boolean = true;
  public allUploadsFinished: boolean = true;
  public showDropzone: boolean = false;
  public element?: HTMLElement;
  public layout: MediaSingleLayout = 'center';
  public mediaNodes: MediaNodeWithPosHandler[] = [];
  public mediaGroupNodes: Record<string, any> = {};
  public mobileUploadComplete: Record<string, boolean> = {};
  private pendingTask = Promise.resolve<MediaState | null>(null);
  public options: MediaPluginOptions;
  private view!: EditorView;
  private destroyed = false;
  public mediaProvider?: MediaProvider;
  private errorReporter: ErrorReporter;

  public pickers: PickerFacade[] = [];
  public pickerPromises: Array<Promise<PickerFacade>> = [];
  private popupPicker?: PickerFacade;
  private dropzonePicker?: PickerFacade;
  // @ts-ignore
  private customPicker?: PickerFacade;

  public editingMediaSinglePos?: number;
  public showEditingDialog?: boolean;

  public editorAppearance: EditorAppearance;
  private removeOnCloseListener: () => void = () => {};
  private dispatchAnalyticsEvent?: DispatchAnalyticsEvent;

  private reactContext: () => {};

  constructor(
    state: EditorState,
    options: MediaPluginOptions,
    reactContext: () => {},
    editorAppearance?: EditorAppearance,
    dispatchAnalyticsEvent?: DispatchAnalyticsEvent,
  ) {
    this.reactContext = reactContext;
    this.options = options;
    this.editorAppearance = editorAppearance!;
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
      (_name, provider?: Promise<MediaProvider>) =>
        this.setMediaProvider(provider),
    );

    this.errorReporter = options.errorReporter || new ErrorReporter();
    this.dispatchAnalyticsEvent = dispatchAnalyticsEvent;
  }

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
      let resolvedMediaProvider: MediaProvider = (this.mediaProvider = await mediaProvider);

      assert(
        resolvedMediaProvider && resolvedMediaProvider.viewContext,
        `MediaProvider promise did not resolve to a valid instance of MediaProvider - ${resolvedMediaProvider}`,
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

    this.mediaContext = await this.mediaProvider.viewContext;

    this.allowsUploads = !!this.mediaProvider.uploadContext;
    const { view, allowsUploads } = this;

    // make sure editable DOM node is mounted
    if (!this.destroyed && view.dom.parentNode) {
      // make PM plugin aware of the state change to update UI during 'apply' hook
      view.dispatch(view.state.tr.setMeta(stateKey, { allowsUploads }));
    }

    if (this.allowsUploads) {
      this.uploadContext = await this.mediaProvider.uploadContext;

      if (this.mediaProvider.uploadParams && this.uploadContext) {
        await this.initPickers(
          this.mediaProvider.uploadParams,
          this.uploadContext,
          PickerFacade,
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
  insertFile = (
    mediaState: MediaState,
    onMediaStateChanged: MediaStateEventSubscriber,
  ) => {
    const collection = this.collectionFromProvider();
    if (collection === undefined) {
      return undefined;
    }

    if (this.editorAppearance === 'mobile') {
      this.mobileUploadComplete[mediaState.id] = false;
    }

    this.allUploadsFinished = false;

    if (isMediaSingle(this.view.state.schema, mediaState.fileMimeType)) {
      insertMediaSingleNode(this.view, mediaState, collection);
    } else {
      insertMediaGroupNode(this.view, [mediaState], collection);
    }

    // do events when media state changes
    onMediaStateChanged(this.handleMediaState);

    // handle waiting for upload complete
    const isEndState = (state: MediaState) =>
      state.status && MEDIA_RESOLVED_STATES.indexOf(state.status) !== -1;

    if (!isEndState(mediaState)) {
      const updater = (promise: Promise<any>) => {
        // Chain the previous promise with a new one for this media item
        return new Promise<MediaState | null>(resolve => {
          const onStateChange: MediaStateEventListener = newState => {
            // When media item reaches its final state, remove listener and resolve
            if (isEndState(newState)) {
              resolve(newState);
            }
          };

          onMediaStateChanged(onStateChange);
        }).then(() => promise);
      };
      this.pendingTask = updater(this.pendingTask);

      this.pendingTask.then(() => {
        this.allUploadsFinished = true;
      });
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
    if (
      this.dropzonePicker &&
      this.popupPicker &&
      this.popupPicker.type === 'popup'
    ) {
      this.dropzonePicker.activate();
    }
  };

  showMediaPicker = () => {
    if (!this.popupPicker) {
      return undefined;
    }
    if (this.dropzonePicker && this.popupPicker.type === 'popup') {
      this.dropzonePicker.deactivate();
    }
    this.popupPicker.show();
  };

  /**
   * Returns a promise that is resolved after all pending operations have been finished.
   * An optional timeout will cause the promise to reject if the operation takes too long
   *
   * NOTE: The promise will resolve even if some of the media have failed to process.
   */
  waitForPendingTasks = (
    timeout?: number,
    lastTask?: Promise<MediaState | null>,
  ) => {
    if (lastTask && this.pendingTask === lastTask) {
      return lastTask;
    }

    const chainedPromise: Promise<any> = this.pendingTask.then(() =>
      // Call ourselves to make sure that no new pending tasks have been
      // added before the current promise has resolved.
      this.waitForPendingTasks(undefined, this.pendingTask!),
    );

    if (!timeout) {
      return chainedPromise;
    }

    let rejectTimeout: number;
    const timeoutPromise = new Promise((_resolve, reject) => {
      rejectTimeout = window.setTimeout(
        () =>
          reject(new Error(`Media operations did not finish in ${timeout} ms`)),
        timeout,
      );
    });

    return Promise.race([
      timeoutPromise,
      chainedPromise.then(() => {
        clearTimeout(rejectTimeout);
      }),
    ]);
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

  private destroyAllPickers = (pickers: Array<PickerFacade>) => {
    pickers.forEach(picker => picker.destroy());
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
      Promise.all(pickerPromises).then(resolvedPickers =>
        this.destroyAllPickers(resolvedPickers),
      );
    }

    this.popupPicker = undefined;
    this.dropzonePicker = undefined;
    this.customPicker = undefined;
  };

  private async initPickers(
    uploadParams: UploadParams,
    context: Context,
    Picker: typeof PickerFacade,
    reactContext: () => {},
  ) {
    if (this.destroyed) {
      return undefined;
    }
    const { errorReporter, pickers, pickerPromises } = this;
    // create pickers if they don't exist, re-use otherwise
    if (!pickers.length) {
      const pickerFacadeConfig: PickerFacadeConfig = {
        context,
        errorReporter,
      };
      const defaultPickerConfig = {
        uploadParams,
        proxyReactContext: reactContext(),
      };

      if (this.options.customMediaPicker) {
        const customPicker = new Picker(
          'customMediaPicker',
          pickerFacadeConfig,
          this.options.customMediaPicker,
        ).init();

        pickerPromises.push(customPicker);
        pickers.push((this.customPicker = await customPicker));
      } else {
        const popupPicker = new Picker(
          // Fallback to browser picker for unauthenticated users
          context.config && context.config.userAuthProvider
            ? 'popup'
            : 'browser',
          pickerFacadeConfig,
          defaultPickerConfig,
        ).init();

        const dropzonePicker = new Picker('dropzone', pickerFacadeConfig, {
          container: this.options.customDropzoneContainer,
          headless: true,
          ...defaultPickerConfig,
        }).init();

        pickerPromises.push(popupPicker, dropzonePicker);
        pickers.push(
          (this.popupPicker = await popupPicker),
          (this.dropzonePicker = await dropzonePicker),
        );

        this.dropzonePicker.onDrag(this.handleDrag);
        this.removeOnCloseListener = this.popupPicker.onClose(
          this.onPopupPickerClose,
        );
      }

      pickers.forEach(picker => {
        picker.onNewMedia(this.insertFile);
        picker.onNewMedia(this.trackNewMediaEvent(picker.type));
      });
    }

    // set new upload params for the pickers
    pickers.forEach(picker => picker.setUploadParams(uploadParams));
  }

  public trackNewMediaEvent(pickerType: string) {
    return (mediaState: MediaState) => {
      analyticsService.trackEvent(
        `atlassian.editor.media.file.${pickerType}`,
        mediaState.fileMimeType
          ? { fileMimeType: mediaState.fileMimeType }
          : {},
      );

      if (this.dispatchAnalyticsEvent) {
        const inputMethod = this.getInputMethod(
          pickerType,
        ) as InputMethodInsertMedia;
        const extensionIdx = mediaState.fileName!.lastIndexOf('.');
        const fileExtension =
          extensionIdx >= 0
            ? mediaState.fileName!.substring(extensionIdx + 1)
            : undefined;

        const payload: AnalyticsEventPayload = {
          action: ACTION.INSERTED,
          actionSubject: ACTION_SUBJECT.DOCUMENT,
          actionSubjectId: ACTION_SUBJECT_ID.MEDIA,
          attributes: { inputMethod, fileExtension },
          eventType: EVENT_TYPE.TRACK,
        };
        this.dispatchAnalyticsEvent(payload);
      }
    };
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

    return updateMediaNodeAttrs(id, attrs, isMediaSingle)(
      view.state,
      view.dispatch,
    );
  };

  private collectionFromProvider(): string | undefined {
    return (
      this.mediaProvider &&
      this.mediaProvider.uploadParams &&
      this.mediaProvider.uploadParams.collection
    );
  }

  private handleMediaState: MediaStateEventListener = state => {
    switch (state.status) {
      case 'error':
        const { uploadErrorHandler } = this.options;
        if (uploadErrorHandler) {
          uploadErrorHandler(state);
        }
        break;

      case 'mobile-upload-end':
        const attrs: { id: string; collection?: string } = {
          id: state.publicId || state.id,
        };

        if (typeof state.collection === 'string') {
          attrs.collection = state.collection;
        }

        this.updateMediaNodeAttrs(
          state.id,
          attrs,
          isMediaSingle(this.view.state.schema, state.fileMimeType),
        );

        // mark mobile upload as complete
        this.mobileUploadComplete[attrs.id] = true;

        delete this.mediaGroupNodes[state.id];
        break;
    }
  };

  isMobileUploadCompleted = (mediaId: string) =>
    helpers.isMobileUploadCompleted(this, mediaId);

  removeNodeById = (state: MediaState) => {
    const { id } = state;
    const mediaNodeWithPos = helpers.findMediaNode(
      this,
      id,
      isImage(state.fileMimeType),
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

  private handleDrag = (dragState: 'enter' | 'leave') => {
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

const createDropPlaceholder = (editorAppearance?: EditorAppearance) => {
  const dropPlaceholder = document.createElement('div');
  if (isFullPage(editorAppearance)) {
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

export const stateKey = new PluginKey('mediaPlugin');
export const getMediaPluginState = (state: EditorState) =>
  stateKey.getState(state) as MediaPluginState;

export const createPlugin = (
  _schema: Schema,
  options: MediaPluginOptions,
  reactContext: () => {},
  dispatch?: Dispatch,
  editorAppearance?: EditorAppearance,
  dispatchAnalyticsEvent?: DispatchAnalyticsEvent,
) => {
  const dropPlaceholder = createDropPlaceholder(editorAppearance);

  return new Plugin({
    state: {
      init(_config, state) {
        return new MediaPluginState(
          state,
          options,
          reactContext,
          editorAppearance,
          dispatchAnalyticsEvent,
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
    view: view => {
      const pluginState = getMediaPluginState(view.state);
      pluginState.setView(view);
      pluginState.updateElement();

      return {
        update: () => {
          pluginState.updateElement();
        },
        destroy: () => {
          pluginState.destroy();
        },
      };
    },
    props: {
      decorations: state => {
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
          Decoration.widget(pos, dropPlaceholder, { key: 'drop-placeholder' }),
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
