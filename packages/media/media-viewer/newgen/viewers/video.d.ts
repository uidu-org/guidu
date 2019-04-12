/// <reference types="react" />
import { Context, FileState } from '@uidu/media-core';
import { Outcome, MediaViewerFeatureFlags } from '../domain';
import { MediaViewerError } from '../error';
import { BaseState, BaseViewer } from './base-viewer';
export declare type Props = Readonly<{
    item: FileState;
    context: Context;
    collectionName?: string;
    featureFlags?: MediaViewerFeatureFlags;
    showControls?: () => void;
    previewCount: number;
}>;
export declare type State = BaseState<string> & {
    isHDActive: boolean;
    coverUrl?: string;
};
export declare class VideoViewer extends BaseViewer<string, Props, State> {
    protected readonly initialState: {
        content: Outcome<string, MediaViewerError>;
        isHDActive: boolean;
    };
    private onHDChange;
    protected renderSuccessful(content: string): JSX.Element;
    protected init(isHDActive?: boolean): Promise<void>;
    protected release(): void;
}
