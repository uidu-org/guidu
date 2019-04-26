import * as React from 'react';
export interface ImagePlacerImageProps {
    src?: string;
    x: number;
    y: number;
    width: number;
    height: number;
    onLoad: (imageElement: HTMLImageElement, width: number, height: number) => void;
    onError: (errorMessage: string) => void;
}
export declare const IMAGE_ERRORS: {
    BAD_URL: string;
    LOAD_FAIL: string;
};
export declare class ImagePlacerImage extends React.Component<ImagePlacerImageProps, {}> {
    componentWillMount(): void;
    onLoad: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
    onError: () => void;
    render(): JSX.Element;
}
