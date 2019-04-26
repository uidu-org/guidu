import { Rectangle, Bounds, FileInfo } from '@uidu/media-ui';
export declare function radians(deg: number): number;
export interface ViewInfo {
    containerRect: Rectangle;
    imageBounds: Bounds;
    sourceBounds: Bounds;
    visibleBounds: Bounds;
}
export declare function applyOrientation(img: HTMLImageElement, canvasWidth: number, canvasHeight: number, orientation: number, sourceWidth: number, sourceHeight: number, destWidth: number, destHeight: number): string;
export interface PreviewInfo {
    fileInfo: FileInfo;
    width: number;
    height: number;
}
export declare function initialiseImagePreview(fileInfo: FileInfo, containerRect: Rectangle, maxZoom: number): Promise<PreviewInfo | null>;
export declare function renderImageAtCurrentView(imageElement: HTMLImageElement | undefined, viewInfo: ViewInfo, useConstraints: boolean, useCircularClipWithActions: boolean, backgroundColor: string): HTMLCanvasElement;
