import * as React from 'react';
import { Component } from 'react';
import { InjectedIntlProps } from 'react-intl';
import { OnLoadHandler } from '../image-cropper';
import { Camera, Rectangle, Vector2 } from '@uidu/media-ui';
export declare const CONTAINER_SIZE: number;
export declare const CONTAINER_INNER_SIZE: number;
export declare const CONTAINER_PADDING: number;
export declare const MAX_SMALL_IMAGE_SCALE = 2500;
export declare const containerRect: Rectangle;
export declare const containerPadding: Vector2;
export interface CropProperties {
    x: number;
    y: number;
    size: number;
}
export interface Props {
    imageSource?: string;
    errorMessage?: string;
    onImageLoaded: (file: File, crop: CropProperties) => void;
    onLoad?: OnLoadHandler;
    onPositionChanged: (x: number, y: number) => void;
    onSizeChanged: (size: number) => void;
    onRemoveImage: () => void;
    onImageUploaded: (file: File) => void;
    onImageError: (errorMessage: string) => void;
    isLoading?: boolean;
}
export interface State {
    camera: Camera;
    imagePos: Vector2;
    cursorPos: Vector2;
    scale: number;
    isDragging: boolean;
    minScale: number;
    fileImageSource?: string;
    imageFile?: File;
    isDroppingFile: boolean;
}
export declare class ImageNavigator extends Component<Props & InjectedIntlProps, State> {
    state: State;
    componentWillMount(): void;
    componentWillUnmount(): void;
    onDragStarted: (x: number, y: number) => void;
    onMouseMove: (e: MouseEvent) => void;
    onMouseUp: () => void;
    /**
     * When newScale change we want to zoom in/out relative to the center of the frame.
     * @param newScale New scale in 0-100 format.
     */
    onScaleChange: (newScale: number) => void;
    /**
     * This gets called when the cropper loads an image
     * at this point we will be able to get the height/width
     * @param width the width of the image
     * @param height the height of the image
     */
    onImageSize: (width: number, height: number) => void;
    calculateMinScale(width: number, height: number): number;
    exportSize(newScale: number): void;
    exportImagePos(pos: Vector2): void;
    validateFile(imageFile: File): string | null;
    readFile(imageFile: File): void;
    onUploadButtonClick: React.MouseEventHandler;
    onFileChange: (e: React.SyntheticEvent<HTMLInputElement, Event>) => void;
    updateDroppingState(e: React.DragEvent<{}>, state: boolean): void;
    onDragEnter: (e: React.DragEvent<{}>) => void;
    onDragOver: (e: React.DragEvent<{}>) => void;
    onDragLeave: (e: React.DragEvent<{}>) => void;
    onDrop: (e: React.DragEvent<{}>) => void;
    renderDragZone: () => JSX.Element;
    renderImageUploader(): JSX.Element;
    onRemoveImage: () => void;
    renderImageCropper(dataURI: string): JSX.Element;
    private readonly dataURI;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<Props, "onLoad" | "isLoading" | "errorMessage" | "imageSource" | "onImageLoaded" | "onPositionChanged" | "onSizeChanged" | "onRemoveImage" | "onImageUploaded" | "onImageError">, any> & {
    WrappedComponent: React.ComponentType<Props & InjectedIntlProps>;
};
export default _default;
