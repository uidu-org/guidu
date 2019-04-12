import * as React from 'react';
export interface TransitionProps {
    enter?: ('fade' | 'slide-up')[];
    exit?: ('fade' | 'slide-down')[];
    timeout: number | {
        enter: number;
        exit: number;
    };
    children: null | React.ReactElement<any>;
}
export interface TransitionState {
    visible: boolean;
    children: null | React.ReactElement<any>;
}
export default class Transition extends React.Component<TransitionProps, TransitionState> {
    constructor(props: TransitionProps);
    componentWillReceiveProps(nextProps: TransitionProps): void;
    handleExited: () => void;
    getStyle(status: 'enter' | 'entering' | 'entered' | 'exit' | 'exiting' | 'exited'): {};
    render(): JSX.Element;
}
