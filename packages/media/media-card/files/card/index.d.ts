import { Component } from 'react';
import { FileDetails, ImageResizeMode, MediaItemType } from '@uidu/media-core';
import { SharedCardProps, CardStatus } from '../..';
export interface FileCardProps extends SharedCardProps {
    readonly status: CardStatus;
    readonly details?: FileDetails;
    readonly dataURI?: string;
    readonly progress?: number;
    readonly onRetry?: () => void;
    readonly resizeMode?: ImageResizeMode;
    readonly disableOverlay?: boolean;
    readonly mediaItemType?: MediaItemType;
    readonly previewOrientation?: number;
}
export declare class FileCard extends Component<FileCardProps, {}> {
    static defaultProps: Partial<FileCardProps>;
    render(): JSX.Element;
    renderFile(): JSX.Element;
    private _getActions;
    private readonly isError;
}
