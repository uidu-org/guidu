export declare type ImageMetaDataTags = {
    Orientation?: string;
    PixelPerUnitX?: number;
    PixelPerUnitY?: number;
    [key: string]: string | number | undefined;
};
export declare type ImageMetaData = {
    type: string;
    width: number;
    height: number;
    tags: ImageMetaDataTags | null;
};
export declare type ImageInfo = {
    scaleFactor: number;
    width: number;
    height: number;
};
export declare enum ImageType {
    JPEG = "image/jpeg",
    PNG = "image/png"
}
export declare enum SupportedImageMetaTag {
    XResolution = "XResolution",
    YResolution = "YResolution",
    Orientation = "Orientation"
}
export declare type FileInfo = {
    file: File;
    src: string;
};
export declare const ExifOrientation: {
    [key: string]: number;
};
export declare type PNGMetaData = {
    iTXt: string;
    pHYs: {
        PixelPerUnitX?: number;
        PixelPerUnitY?: number;
    };
};
export declare type PNGChunk = {
    name: string;
    data: Uint8Array;
};
