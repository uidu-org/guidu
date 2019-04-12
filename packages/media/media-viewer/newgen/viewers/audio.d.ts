/// <reference types="react" />
import { Context, FileState } from '@uidu/media-core';
import { Outcome, MediaViewerFeatureFlags } from '../domain';
import { MediaViewerError } from '../error';
import { BaseState, BaseViewer } from './base-viewer';
export declare type Props = Readonly<{
    item: FileState;
    context: Context;
    collectionName?: string;
    previewCount: number;
    featureFlags?: MediaViewerFeatureFlags;
    showControls?: () => void;
}>;
export declare type State = BaseState<string> & {
    coverUrl?: string;
};
export declare class AudioViewer extends BaseViewer<string, Props, State> {
    protected readonly initialState: {
        content: Outcome<string, MediaViewerError>;
    };
    private renderCover;
    private saveAudioElement;
    protected renderSuccessful(src: string): JSX.Element;
    private loadCover;
    private setCoverUrl;
    protected init(): Promise<void>;
    protected release(): void;
}
