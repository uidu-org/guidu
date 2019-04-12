import * as React from 'react';
import { Context, FileState, FileIdentifier } from '@uidu/media-core';
import { Outcome, MediaViewerFeatureFlags } from './domain';
import { MediaViewerError } from './error';
import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';
export declare type Props = Readonly<{
    identifier: FileIdentifier;
    context: Context;
    featureFlags?: MediaViewerFeatureFlags;
    showControls?: () => void;
    onClose?: () => void;
    previewCount: number;
}> & WithAnalyticsEventProps;
export declare type State = {
    item: Outcome<FileState, MediaViewerError>;
};
export declare class ItemViewerBase extends React.Component<Props, State> {
    state: State;
    private subscription?;
    UNSAFE_componentWillReceiveProps(nextProps: Props): void;
    componentDidUpdate(oldProps: Props): void;
    componentWillUnmount(): void;
    componentDidMount(): void;
    private onViewerLoaded;
    private renderFileState;
    private renderError;
    render(): JSX.Element;
    private renderDownloadButton;
    private init;
    private fireAnalytics;
    private needsReset;
    private release;
}
export declare const ItemViewer: React.ComponentClass<Pick<Props, "context" | "showControls" | "onClose" | "featureFlags" | "previewCount" | "identifier">, any>;
