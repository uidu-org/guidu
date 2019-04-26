import * as React from 'react';
import { Component } from 'react';
import { InjectedIntlProps } from 'react-intl';
export interface LoadParameters {
    export: () => string;
}
export declare type OnLoadHandler = (params: LoadParameters) => void;
export interface ImageCropperProp {
    imageSource: string;
    scale?: number;
    containerSize?: number;
    isCircularMask?: boolean;
    top: number;
    left: number;
    imageWidth?: number;
    onDragStarted?: (x: number, y: number) => void;
    onImageSize: (width: number, height: number) => void;
    onLoad?: OnLoadHandler;
    onRemoveImage: () => void;
    onImageError: (errorMessage: string) => void;
}
export declare class ImageCropper extends Component<ImageCropperProp & InjectedIntlProps, {}> {
    private imageElement?;
    static defaultProps: {
        containerSize: number;
        isCircleMask: boolean;
        scale: number;
        onDragStarted: () => void;
        onImageSize: () => void;
    };
    componentDidMount(): void;
    onDragStarted: (e: React.MouseEvent<{}, MouseEvent>) => void;
    onImageLoaded: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
    onImageError: () => void;
    render(): JSX.Element;
    private readonly width;
    export: () => string;
}
declare const _default: React.ComponentClass<Pick<ImageCropperProp, "scale" | "onLoad" | "left" | "top" | "imageSource" | "onRemoveImage" | "onImageError" | "containerSize" | "isCircularMask" | "imageWidth" | "onDragStarted" | "onImageSize">, any> & {
    WrappedComponent: React.ComponentType<ImageCropperProp & InjectedIntlProps>;
};
export default _default;
