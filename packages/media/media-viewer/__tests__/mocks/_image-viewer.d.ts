import * as React from 'react';
import { Context, ProcessedFileState } from '@uidu/media-core';
import { AnalyticViewerProps, ViewerLoadPayload } from '../../../src/newgen/analytics/item-viewer';
export declare const setViewerPayload: (payload: ViewerLoadPayload) => void;
export declare type ImageViewerProps = AnalyticViewerProps & {
    context: Context;
    item: ProcessedFileState;
    collectionName?: string;
    onClose?: () => void;
};
export declare class ImageViewer extends React.Component<ImageViewerProps, {}> {
    componentDidMount(): void;
    render(): JSX.Element;
}
