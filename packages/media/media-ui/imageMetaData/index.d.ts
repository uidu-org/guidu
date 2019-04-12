import { ImageInfo, ImageMetaData, ImageMetaDataTags, FileInfo } from './types';
export { ImageInfo, ImageMetaData, ImageMetaDataTags, FileInfo, ExifOrientation, } from './types';
export declare function getImageInfo(fileInfo: FileInfo): Promise<ImageInfo | null>;
export declare function getScaleFactor(file: File, tags: ImageMetaDataTags | null): number;
export declare function getOrientation(file: File): Promise<number>;
export declare function getMetaTagNumericValue(tags: ImageMetaDataTags, key: string, defaultValue: number): number;
export declare function getScaleFactorFromFile(file: File): number | null;
export declare function readImageMetaData(fileInfo: FileInfo): Promise<ImageMetaData | null>;
export * from './imageOrientationUtil';
