import { FileInfo } from './imageMetaData/types';
export declare function dataURItoFile(dataURI: string, filename?: string): File;
export declare function fileToDataURI(blob: Blob): Promise<string>;
export declare function getFileInfo(file: File, src?: string): Promise<FileInfo>;
export declare function getFileInfoFromSrc(src: string, file?: File): Promise<FileInfo>;
export declare function fileToArrayBuffer(file: File): Promise<Uint8Array>;
export declare function loadImage(src: string): Promise<HTMLImageElement>;
