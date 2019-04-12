import { Component } from 'react';
import { Context, FileIdentifier } from '@uidu/media-core';
import { Subscription } from 'rxjs/Subscription';
import { CardDimensions } from '..';
export interface InlinePlayerProps {
    identifier: FileIdentifier;
    context: Context;
    dimensions: CardDimensions;
    selected?: boolean;
    onError?: (error: Error) => void;
    onClick?: () => void;
}
export interface InlinePlayerState {
    fileSrc?: string;
}
export declare class InlinePlayer extends Component<InlinePlayerProps, InlinePlayerState> {
    subscription?: Subscription;
    state: InlinePlayerState;
    static defaultProps: {
        dimensions: {
            width: number;
            height: number;
        };
    };
    componentDidMount(): Promise<void>;
    unsubscribe: () => void;
    revoke: () => void;
    componentWillUnmount(): void;
    private getStyle;
    render(): JSX.Element;
}
