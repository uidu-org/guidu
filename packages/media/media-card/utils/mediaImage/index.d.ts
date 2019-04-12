/**
 * Only used internally ATM
 */
import * as React from 'react';
import { Component } from 'react';
export interface MediaImageProps {
    dataURI: string;
    crop?: boolean;
    stretch?: boolean;
    previewOrientation?: number;
}
export interface MediaImageState {
    isImageLoaded: boolean;
    imgWidth: number;
    imgHeight: number;
    parentWidth: number;
    parentHeight: number;
}
export declare class MediaImage extends Component<MediaImageProps, MediaImageState> {
    static defaultProps: Partial<MediaImageProps>;
    imageRef: React.RefObject<HTMLImageElement>;
    constructor(props: MediaImageProps);
    componentDidMount(): void;
    onImageLoad: () => void;
    render(): JSX.Element;
}
