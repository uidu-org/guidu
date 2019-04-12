import { Component, ReactNode } from 'react';
import { MediaType, ImageResizeMode } from '@uidu/media-core';
import { CardDimensions, CardStatus } from '../../index';
import { CardAction } from '../../actions';
export interface FileCardImageViewProps {
    readonly mediaName?: string;
    readonly mediaType?: MediaType;
    readonly fileSize?: string;
    readonly dataURI?: string;
    readonly progress?: number;
    readonly status: CardStatus;
    readonly dimensions?: CardDimensions;
    readonly resizeMode?: ImageResizeMode;
    readonly disableOverlay?: boolean;
    readonly selectable?: boolean;
    readonly selected?: boolean;
    readonly error?: ReactNode;
    readonly actions?: CardAction[];
    readonly onRetry?: () => void;
    readonly previewOrientation?: number;
}
export declare class FileCardImageView extends Component<FileCardImageViewProps, {}> {
    static defaultProps: {
        resizeMode: string;
        disableOverlay: boolean;
    };
    render(): JSX.Element;
    private renderCardContents;
    private renderLoadingContents;
    private renderErrorContents;
    private renderFailedContents;
    private renderUploadingCardOverlay;
    private renderPlayButton;
    private renderMediaImage;
    private renderProgressBar;
    private renderSuccessCardContents;
    private renderSuccessCardOverlay;
    private readonly isImageNotReadyForDisplay;
    private readonly isCropped;
    private readonly isStretched;
}
export default FileCardImageView;
