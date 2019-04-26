import { Component } from 'react';
import * as Bricks from 'bricks.js';
import { BricksInstance, SizeDetail } from 'bricks.js';
export interface BricksLayoutProps {
    id: string;
    children: JSX.Element[];
    packed?: string;
    sizes?: SizeDetail[];
}
export interface BricksLayoutState {
    instance: BricksInstance;
}
export declare class BricksLayout extends Component<BricksLayoutProps, BricksLayoutState> {
    static defaultProps: {
        packed: string;
        sizes: {
            columns: number;
            gutter: number;
        }[];
    };
    componentDidMount(): void;
    componentDidUpdate({ children: prevChildren }: BricksLayoutProps): Bricks.BricksInstance;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
