export { DropzoneUploadEventPayloadMap, PopupUploadEventPayloadMap, } from './components/types';
import { BinaryUploader, BinaryUploaderConstructor, BinaryConfig, Browser, BrowserConfig, BrowserConstructor, ClipboardConstructor, ClipboardConfig, Clipboard, Popup, PopupConfig, PopupConstructor, DropzoneConfig, DropzoneConstructor, Dropzone } from './components/types';
import { Context } from '@uidu/media-core';
export declare const isBinaryUploader: (component: any) => component is BinaryUploader;
export declare const isBrowser: (component: any) => component is Browser;
export declare const isClipboard: (component: any) => component is Clipboard;
export declare const isDropzone: (component: any) => component is Dropzone;
export declare const isPopup: (component: any) => component is Popup;
export { UploadsStartEventPayload, UploadStatusUpdateEventPayload, UploadPreviewUpdateEventPayload, UploadProcessingEventPayload, UploadEndEventPayload, UploadErrorEventPayload, UploadEventPayloadMap, isImagePreview, } from './domain/uploadEvent';
export { MediaFile } from './domain/file';
export { MediaProgress } from './domain/progress';
export { MediaError } from './domain/error';
export { ImagePreview, Preview, NonImagePreview } from './domain/preview';
export interface MediaPickerConstructors {
    binary: BinaryUploaderConstructor;
    browser: BrowserConstructor;
    clipboard: ClipboardConstructor;
    dropzone: DropzoneConstructor;
    popup: PopupConstructor;
}
export { BinaryUploader, Browser, Clipboard, Dropzone, Popup };
export declare type MediaPickerComponent = BinaryUploader | Browser | Clipboard | Dropzone | Popup;
export interface MediaPickerComponents {
    binary: BinaryUploader;
    browser: Browser;
    clipboard: Clipboard;
    dropzone: Dropzone;
    popup: Popup;
}
export { UploadParams } from './domain/config';
export { BrowserConfig, DropzoneConfig, PopupConfig, BinaryConfig, ClipboardConfig, };
export interface ComponentConfigs {
    binary: BinaryConfig;
    browser: BrowserConfig;
    clipboard: ClipboardConfig;
    dropzone: DropzoneConfig;
    popup: PopupConfig;
}
export { BinaryUploaderConstructor, BrowserConstructor, ClipboardConstructor, DropzoneConstructor, PopupConstructor, };
export declare function MediaPicker<K extends keyof MediaPickerComponents>(componentName: K, context: Context, pickerConfig?: ComponentConfigs[K]): Promise<MediaPickerComponents[K]>;
