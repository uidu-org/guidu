import { Rectangle, Bounds, Vector2 } from '@uidu/media-ui';
export declare function zoomToFit(imageWidth: number, imageHeight: number, visibleBounds: Bounds): Rectangle;
export declare function applyConstraints(useConstraints: boolean, imageBounds: Bounds, visibleBounds: Bounds): Vector2;
export declare function applyFullConstraints(imageBounds: Bounds, visibleBounds: Bounds): Vector2;
export declare function applyPartialConstraints(imageBounds: Bounds, visibleBounds: Bounds): Vector2;
export declare function transformVisibleBoundsToImageCoords(visibleBoundsX: number, visibleBoundsY: number, imageSourceRect: Rectangle, imageBounds: Bounds, visibleBounds: Bounds): Vector2;
