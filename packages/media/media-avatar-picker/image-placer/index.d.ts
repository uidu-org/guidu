import * as React from 'react';
import { Rectangle, Vector2, Bounds, FileInfo } from '@uidu/media-ui';
export interface ImageActions {
    toCanvas: () => HTMLCanvasElement;
    toDataURL: () => string;
    toFile: () => File;
}
export interface ImagePlacerProps {
    containerWidth: number;
    containerHeight: number;
    src?: string | File;
    margin: number;
    zoom: number;
    maxZoom: number;
    originX: number;
    originY: number;
    useConstraints: boolean;
    isCircular: boolean;
    useCircularClipWithActions: boolean;
    backgroundColor: string;
    onImageChange?: (imageElement: HTMLImageElement) => void;
    onZoomChange?: (zoom: number) => void;
    onImageActions?: (actions: ImageActions) => void;
    onRenderError?: (errorMessage: string) => JSX.Element;
}
export declare const DEFAULT_MAX_ZOOM = 4;
export declare const DEFAULT_MARGIN = 28;
export declare const DEFAULT_CONTAINER_SIZE = 200;
export declare const DEFAULT_ZOOM = 0;
export declare const DEFAULT_ORIGIN_X = 0;
export declare const DEFAULT_ORIGIN_Y = 0;
export declare const DEFAULT_USE_CONSTRAINTS = true;
export declare const DEFAULT_USE_CIRCULAR = false;
export declare const DEFAULT_USE_CIRCULAR_CLIP_WITH_ACTIONS = false;
export declare const DEFAULT_BACKGROUND_COLOR = "transparent";
export declare const defaultProps: {
    containerWidth: number;
    containerHeight: number;
    margin: number;
    zoom: number;
    maxZoom: number;
    originX: number;
    originY: number;
    useConstraints: boolean;
    isCircular: boolean;
    useCircularClipWithActions: boolean;
    backgroundColor: string;
};
export interface ImagePlacerState {
    imageWidth: number;
    imageHeight: number;
    originX: number;
    originY: number;
    zoom: number;
    errorMessage?: string;
    dragOrigin?: Vector2;
    src?: string | File;
}
export declare class ImagePlacer extends React.Component<ImagePlacerProps, ImagePlacerState> {
    imageSourceRect: Rectangle;
    imageElement?: HTMLImageElement;
    static defaultProps: {
        containerWidth: number;
        containerHeight: number;
        margin: number;
        zoom: number;
        maxZoom: number;
        originX: number;
        originY: number;
        useConstraints: boolean;
        isCircular: boolean;
        useCircularClipWithActions: boolean;
        backgroundColor: string;
    };
    state: ImagePlacerState;
    readonly containerRectWithMargins: Rectangle;
    readonly containerRect: Rectangle;
    readonly imageBounds: Bounds;
    private calcImageBounds;
    readonly visibleBounds: Bounds;
    readonly sourceBounds: Bounds;
    componentWillMount(): void;
    private provideImageActions;
    UNSAFE_componentWillReceiveProps(nextProps: ImagePlacerProps): Promise<void>;
    preprocessFile(fileInfo: FileInfo): Promise<void>;
    setSrc(fileInfo: FileInfo): void;
    private updateZoomProp;
    reset(): void;
    update(): void;
    zoomToFit(): void;
    applyConstraints(): void;
    setZoom(newZoom: number): void;
    transformVisibleBoundsToImageCoords(visibleBoundsX: number, visibleBoundsY: number): Vector2;
    toCanvas: () => HTMLCanvasElement;
    toDataURL: () => string;
    toFile: () => File;
    onImageLoad: (imageElement: HTMLImageElement, width: number, height: number) => void;
    onImageError: (errorMessage: string) => void;
    onDragStart: () => void;
    onDragMove: (delta: Vector2) => void;
    onWheel: (delta: number) => void;
    render(): JSX.Element;
}
