import * as React from 'react';
import { Context, FileState } from '@uidu/media-core';
import { Outcome } from '../domain';
import { MediaViewerError } from '../error';
export declare type BaseProps = {
    context: Context;
    item: FileState;
    collectionName?: string;
};
export declare type BaseState<Content> = {
    content: Outcome<Content, MediaViewerError>;
};
export declare abstract class BaseViewer<Content, Props extends BaseProps, State extends BaseState<Content> = BaseState<Content>> extends React.Component<Props, State> {
    state: State;
    componentDidMount(): void;
    componentWillUnmount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: Readonly<Props>): void;
    componentDidUpdate(prevProps: Props): void;
    render(): React.ReactNode;
    private getInitialState;
    private renderDownloadButton;
    protected needsReset(propsA: Props, propsB: Props): boolean;
    protected abstract init(): void;
    protected abstract release(): void;
    protected abstract readonly initialState: State;
    protected abstract renderSuccessful(content: Content): React.ReactNode;
}
