import { ImageMetadata } from '@uidu/media-store';
export declare type NonImagePreview = {
    readonly file?: Blob;
};
export declare type ImagePreview = NonImagePreview & {
    readonly dimensions: {
        readonly width: number;
        readonly height: number;
    };
    readonly scaleFactor: number;
};
export declare type Preview = NonImagePreview | ImagePreview;
export declare const isImagePreview: (preview: Preview) => preview is ImagePreview;
export declare const getPreviewFromMetadata: (metadata: ImageMetadata) => Preview;
