import * as React from 'react';
import { Component } from 'react';
export interface TimeRangeProps {
    currentTime: number;
    bufferedTime: number;
    duration: number;
    onChange: (newTime: number) => void;
    disableThumbTooltip: boolean;
    isAlwaysActive: boolean;
}
export interface TimeRangeState {
    isDragging: boolean;
    dragStartClientX: number;
}
export declare class TimeRange extends Component<TimeRangeProps, TimeRangeState> {
    wrapperElement?: HTMLElement;
    thumbElement?: HTMLElement;
    wrapperElementWidth: number;
    state: TimeRangeState;
    static defaultProps: Partial<TimeRangeProps>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private setWrapperWidth;
    onMouseMove: (e: MouseEvent) => void;
    onMouseUp: () => void;
    onThumbMouseDown: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void;
    private saveWrapperElement;
    private saveThumbElement;
    render(): JSX.Element;
}
