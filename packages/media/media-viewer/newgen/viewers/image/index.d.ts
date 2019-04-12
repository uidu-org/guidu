/// <reference types="react" />
import { Context, FileState } from '@uidu/media-core';
import { Outcome } from '../../domain';
import { MediaViewerError } from '../../error';
import { AnalyticViewerProps } from '../../analytics/item-viewer';
import { BaseViewer } from '../base-viewer';
export declare type ObjectUrl = string;
export declare const REQUEST_CANCELLED = "request_cancelled";
export declare type ImageViewerProps = AnalyticViewerProps & {
    context: Context;
    item: FileState;
    collectionName?: string;
    onClose?: () => void;
};
export interface ImageViewerContent {
    objectUrl: ObjectUrl;
    orientation?: number;
}
export declare class ImageViewer extends BaseViewer<ImageViewerContent, ImageViewerProps> {
    protected readonly initialState: {
        content: Outcome<ImageViewerContent, MediaViewerError>;
    };
    private cancelImageFetch?;
    preventRaceCondition(): void;
    protected init(): Promise<void>;
    protected release(): void;
    revokeObjectUrl(objectUrl: string): void;
    protected renderSuccessful(content: ImageViewerContent): JSX.Element;
    private onLoad;
    private onError;
}
