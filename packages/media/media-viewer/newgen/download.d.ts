/// <reference types="react" />
import { Context, FileState, FileIdentifier } from '@uidu/media-core';
import { MediaViewerError } from './error';
export declare const DownloadButton: any;
export declare const createItemDownloader: (file: FileState, context: Context, collectionName?: string) => () => Promise<void>;
export declare type ErrorViewDownloadButtonProps = {
    state: FileState;
    context: Context;
    err: MediaViewerError;
    collectionName?: string;
};
export declare const ErrorViewDownloadButton: (props: ErrorViewDownloadButtonProps) => JSX.Element;
export declare type ToolbarDownloadButtonProps = {
    state: FileState;
    identifier: FileIdentifier;
    context: Context;
};
export declare const ToolbarDownloadButton: (props: ToolbarDownloadButtonProps) => JSX.Element;
export declare const DisabledToolbarDownloadButton: JSX.Element;
