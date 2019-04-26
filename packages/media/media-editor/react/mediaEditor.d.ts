import * as React from 'react';
import { ColorWithAlpha, Dimensions, ExportedImage, ShapeParameters, Tool } from '../common';
export declare type ImageGetter = (format?: string) => ExportedImage;
export interface LoadParameters {
    imageGetter: ImageGetter;
}
export declare type LoadHandler = (imageUrl: string, loadParameters: LoadParameters) => void;
export declare type ErrorHandler = (imageUrl: string, error: Error) => void;
export declare type ShapeParametersChangedHandler = (parameters: ShapeParameters) => void;
export interface MediaEditorProps {
    imageUrl: string;
    dimensions: Dimensions;
    screenScaleFactor?: number;
    backgroundColor: ColorWithAlpha;
    shapeParameters: ShapeParameters;
    tool: Tool;
    onLoad: LoadHandler;
    onError: ErrorHandler;
    onShapeParametersChanged: ShapeParametersChangedHandler;
}
export interface MediaEditorState {
    isImageLoaded: boolean;
}
export declare class MediaEditor extends React.Component<MediaEditorProps, MediaEditorState> {
    private isUnmounted;
    private outputArea;
    private canvas;
    private supplementaryCanvas;
    private hiddenTextArea;
    private hiddenTextHelperDiv;
    private drawingArea?;
    private toolbar?;
    private engine?;
    constructor(props: MediaEditorProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: MediaEditorProps): void;
    componentWillUnmount(): void;
    private handleOutputAreaInnerRef;
    private handleSupplementaryCanvasInnerRef;
    private handleHiddenTextAreaInnerRef;
    private handleHiddenTextHelperDivInnerRef;
    private handleDrawingCanvasInnerRef;
    private renderSpinner;
    render(): JSX.Element;
    private loadEngine;
    private unloadEngine;
    private static toOutputSize;
    private static readonly screenScaleFactor;
}
export default MediaEditor;
