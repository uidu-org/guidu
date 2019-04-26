import { Component } from 'react';
export interface SpinnerViewProps {
    readonly onCancel: () => void;
}
export declare class SpinnerView extends Component<SpinnerViewProps> {
    private escHelper?;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
