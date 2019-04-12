import { Component } from 'react';
export declare type ThresholdReachedEventHandler = () => void;
export interface InfiniteScrollProps {
    readonly height?: number | string;
    readonly width?: string;
    readonly delay?: number;
    readonly threshold?: number;
    readonly onThresholdReached?: ThresholdReachedEventHandler;
}
export interface InfiniteScrollState {
}
export declare class InfiniteScroll extends Component<InfiniteScrollProps, InfiniteScrollState> {
    private readonly div;
    constructor(props: InfiniteScrollProps);
    static defaultProps: {
        width: string;
        delay: number;
        threshold: number;
    };
    private scrollHeight;
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
    private checkThreshold;
    private readonly checkThresholdDebounce;
}
