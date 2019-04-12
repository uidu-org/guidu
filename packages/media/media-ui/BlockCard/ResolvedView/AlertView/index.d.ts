import * as React from 'react';
export interface AlertViewProps {
    type: 'success' | 'failure';
    text?: string;
    onRetry: () => void;
    onDismis: () => void;
    style?: {};
}
export interface AlertViewState {
    width?: number;
}
export default class AlertView extends React.Component<AlertViewProps, AlertViewState> {
    state: AlertViewState;
    el?: HTMLDivElement;
    handleRetry: (event: React.MouseEvent<Element, MouseEvent>) => void;
    handleDismis: (event: React.MouseEvent<Element, MouseEvent>) => void;
    handleMount: (el?: HTMLDivElement) => void;
    handleResize: any;
    componentDidMount(): void;
    componentWillUnMount(): void;
    renderContent(): JSX.Element;
    renderRetryAndCancel(): JSX.Element;
    render(): JSX.Element;
}
