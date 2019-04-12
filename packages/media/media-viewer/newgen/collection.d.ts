import * as React from 'react';
import { Context, FileIdentifier } from '@uidu/media-core';
import { Outcome, MediaViewerFeatureFlags } from './domain';
import { MediaViewerError } from './error';
import { MediaCollectionItem } from '@uidu/media-store';
export declare type Props = Readonly<{
    onClose?: () => void;
    defaultSelectedItem?: FileIdentifier;
    showControls?: () => void;
    featureFlags?: MediaViewerFeatureFlags;
    collectionName: string;
    context: Context;
    pageSize: number;
}>;
export declare type State = {
    items: Outcome<MediaCollectionItem[], MediaViewerError>;
};
export declare class Collection extends React.Component<Props, State> {
    state: State;
    private subscription?;
    componentWillUpdate(nextProps: Props): void;
    componentWillUnmount(): void;
    componentDidMount(): void;
    render(): JSX.Element;
    private init;
    private release;
    private needsReset;
    private onNavigationChange;
    private shouldLoadNext;
    private isLastItem;
}
