export type MediaStateStatus =
  | 'unknown'
  | 'ready'
  | 'cancelled'
  | 'preview'
  | 'error'
  | 'mobile-upload-end';

export interface MediaState {
  id: string;
  status?: MediaStateStatus;
  fileName?: string;
  fileSize?: number;
  fileMimeType?: string;
  collection?: string;
  dimensions?: {
    width: number | undefined;
    height: number | undefined;
  };
  scaleFactor?: number;
  error?: {
    name: string;
    description: string;
  };
  /** still require to support Mobile */
  publicId?: string;
}

export interface FeatureFlags {}

export interface MediaProvider {
  uploadParams?: any;

  /**
   * Used for displaying Media Cards and downloading files.
   * This is context config is required.
   */
  viewContext: Promise<any>;

  /**
   * (optional) Used for creating new uploads and finalizing files.
   * NOTE: We currently don't accept Context instance, because we need config properties
   *       to initialize
   */
  uploadContext?: Promise<any>;

  /**
   * (optional) For any additional feature to be enabled
   */
  featureFlags?: FeatureFlags;
}

export type Listener = (data: any) => void;

export interface CustomMediaPicker {
  on(event: string, cb: Listener): void;
  removeAllListeners(event: any): void;
  emit(event: string, data: any): void;
  destroy(): void;
  setUploadParams(uploadParams: any): void;
}

export type MobileUploadEndEventPayload = {
  readonly file: any & {
    readonly collectionName?: string;
    readonly publicId?: string;
  };
};

export type MediaEditorState = {
  context?: any;
  editor?: {
    pos: number;
    identifier: any;
  };
};

export type OpenMediaEditor = {
  type: 'open';
  pos: number;
  identifier: any;
};

export type UploadAnnotation = {
  type: 'upload';
  newIdentifier: any;
};

export type CloseMediaEditor = {
  type: 'close';
};

export type SetMediaContext = {
  type: 'setContext';
  context?: any;
};

export type MediaEditorAction =
  | OpenMediaEditor
  | CloseMediaEditor
  | UploadAnnotation
  | SetMediaContext;
