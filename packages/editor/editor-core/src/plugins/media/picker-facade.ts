import { ErrorReportingHandler } from '@uidu/editor-common';
import MediaPicker from '@uidu/media-picker';
import {
  CustomMediaPicker,
  MediaState,
  MobileUploadEndEventPayload,
} from './types';

export type PickerType = 'customMediaPicker';
export type ExtendedComponentConfigs = {
  customMediaPicker: CustomMediaPicker;
};

export type PickerFacadeConfig = {
  context: any;
  errorReporter: ErrorReportingHandler;
};

export type MediaStateEvent = MediaState;
export type MediaStateEventListener = (evt: MediaStateEvent) => void;

export type MediaStateEventSubscriber = (
  listener: MediaStateEventListener,
) => void;
export type NewMediaEvent = (
  state: MediaState,
  onStateChanged: MediaStateEventSubscriber,
) => void;

export default class PickerFacade {
  private picker?: any;
  private onDragListeners: Array<Function> = [];
  private errorReporter: ErrorReportingHandler;
  private pickerType: PickerType;
  private onStartListeners: Array<NewMediaEvent> = [];
  private eventListeners: Record<
    string,
    Array<MediaStateEventListener> | undefined
  > = {};

  constructor(
    pickerType: PickerType,
    readonly config: PickerFacadeConfig,
    readonly pickerConfig?: ExtendedComponentConfigs[PickerType],
    readonly mediaPickerFactoryClass = MediaPicker,
  ) {
    this.pickerType = pickerType;
    this.errorReporter = config.errorReporter;
  }

  async init(): Promise<PickerFacade> {
    let picker;
    console.log('foo');
    // if (this.pickerType === 'customMediaPicker') {
    //   picker = this.picker = this.pickerConfig as CustomMediaPicker;
    // } else {
    //   picker = this.picker = await this.mediaPickerFactoryClass(
    //     this.pickerType,
    //     this.config.context,
    //     this.pickerConfig as any,
    //   );
    // }

    // (picker as any).on('upload-preview-update', this.handleUploadPreviewUpdate);
    (picker as any).on('upload-processing', this.handleReady);
    (picker as any).on('upload-error', this.handleUploadError);
    (picker as any).on('mobile-upload-end', this.handleMobileUploadEnd);

    return this;
  }

  get type() {
    return this.pickerType;
  }

  get mediaPicker() {
    return this.picker;
  }

  destroy() {
    const { picker } = this;

    if (!picker) {
      return undefined;
    }

    (picker as any).removeAllListeners('upload-preview-update');
    (picker as any).removeAllListeners('upload-processing');
    (picker as any).removeAllListeners('upload-error');

    this.onStartListeners = [];
    this.onDragListeners = [];

    try {
    } catch (ex) {
      this.errorReporter.captureException(ex);
    }
  }

  setUploadParams(params): void {
    if (this.picker) {
      this.picker.setUploadParams(params);
    }
  }

  onClose(cb: () => void): () => void {
    const { picker } = this;
    return () => {};
  }

  activate() {
    const { picker } = this;
  }

  deactivate() {
    const { picker } = this;
  }

  show(): void {}

  hide(): void {}

  onNewMedia(cb: NewMediaEvent) {
    this.onStartListeners.push(cb);
  }

  onDrag(cb: (state: 'enter' | 'leave') => any) {
    this.onDragListeners.push(cb);
  }

  public handleUploadError = ({ error }) => {
    if (!error || !error.fileId) {
      const err = new Error(
        `Media: unknown upload-error received from Media Picker: ${error &&
          error.name}`,
      );
      this.errorReporter.captureException(err);
      return undefined;
    }

    const listeners = this.eventListeners[error.fileId];
    if (!listeners) {
      return undefined;
    }

    listeners.forEach(cb =>
      cb({
        id: error.fileId!,
        status: 'error',
        error: error && { description: error.description, name: error.name },
      }),
    );

    // remove listeners
    delete this.eventListeners[error.fileId];
  };

  public handleMobileUploadEnd = (event: MobileUploadEndEventPayload) => {
    const { file } = event;

    const listeners = this.eventListeners[file.id];
    if (!listeners) {
      return undefined;
    }

    listeners.forEach(cb =>
      cb({
        id: file.id,
        status: 'mobile-upload-end',
        fileMimeType: file.type,
        collection: file.collectionName,
        publicId: file.publicId,
      }),
    );
  };

  public handleReady = event => {
    const { file } = event;

    const listeners = this.eventListeners[file.id];
    if (!listeners) {
      return undefined;
    }

    listeners.forEach(cb =>
      cb({
        id: file.id,
        status: 'ready',
      }),
    );

    // remove listeners
    delete this.eventListeners[file.id];
  };

  private handleDragEnter = () => {
    this.onDragListeners.forEach(cb => cb.call(cb, 'enter'));
  };

  private handleDragLeave = () => {
    this.onDragListeners.forEach(cb => cb.call(cb, 'leave'));
  };
}
