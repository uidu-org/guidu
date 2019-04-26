import * as React from 'react';
export interface MarginProps {
    width: number;
    height: number;
    size: number;
    circular: boolean;
}
export interface MarginState {
}
export declare class Margin extends React.Component<MarginProps, MarginState> {
    render(): JSX.Element;
}
